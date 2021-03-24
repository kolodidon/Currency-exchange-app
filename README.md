# Приложение для просмотра курса валют
## https://kolodidon.github.io/exchange-app/
Часть функция закрыта для неавторизованного пользователя, залогиниться можно по этим данным:
```
login: git-tester@test.test
password: tester
```
Можно и зарегистрироваться и использовать свои данные для входа.

## Как это работает:
1. [Главная](#main)
2. [Калькулятор](#calc)
3. [Выборки](#samples)
4. [Логин / Регистрация](#login_register)

## TODO:
1. Сделать для обменника более репрезентативную вёрстку
2. Адаптировать верстку для разных устройств
3. Устранить баг в калькуляторе: правый input не должен влиять на результат расчётов

### Главная <a name="main"></a>
На этой странице делается запрос к API с данными курсов валют, опубликованным Центральным Европейским Банком:
```js
fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
      .then((response) => response.json())
      .then((response) => {
        const rateArr = ["USD", "CNY", "EUR", "GBP", "JPY", "RUB", "CHF"];
        const currency = { ...this.state.currency };
        for (let i = 0; i < rateArr.length; i++) {
          currency[rateArr[i]].course = response.rates[rateArr[i]].toFixed(2);
        }
        this.setState({
          rate: response.rates,
          date: response.date,
          currency: currency,
        });
      });
```
После выполнения запроса, информация выводится на таблицу.

### Калькулятор <a name="calc"></a>
Фиксируется количество базовой валюты (RUB), которую нужно обменять:
```js
  inputValueHandler = (event) => {
    this.setState({
      inputValue: event.target.value,
      result: null,
    });
  };
```
Фиксируется валюта, на которую нужно произвести расчет:
```js
  currencyValueHandler = (event) => {
    this.setState({ 
        currencyValue: event.target.value,
        result: null
    });
  };
```
При нажатии кнопки, отправляется запрос на курс валюты, производится расчёт:
```js
  calculatorHandler = async (value) => {
    let result;
    await fetch(`https://api.exchangeratesapi.io/latest?base=RUB`)
      .then((response) => response.json())
      .then((response) => {
        result = response.rates[value] * this.state.inputValue;
      });
    this.setState({ result: result.toFixed(2) });
  };
```

### Выборки <a name="samples"></a>
Из инпутов первой, второй валюты и даты фиксируются данные:
```js
  baseHandler = (event) => {
    this.setState({
      sample: { ...this.state.sample, base: event.target.value },
    });
  };

  base2Handler = (event) => {
    this.setState({
      sample: { ...this.state.sample, base2: event.target.value },
    });
  };

  sampleDateHandler = (event) => {
    this.setState({
      sample: { ...this.state.sample, date: event.target.value },
    });
  };
```
При нажатии на "Получить курс", отправляется запрос для получения нужного курса к определённой дате:
```js
    await fetch(
      `https://api.exchangeratesapi.io/${this.state.sample.date}?base=${this.state.sample.base}`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.setState({
          sample: {
            ...this.state.sample,
            course: response.rates[this.state.sample.base2],
          },
        });
      });
```
Результат фиксируется в объекте sample, после чего объект отправляется в БД на сервер firebase:
```js
    await axios
      .post(
        "https://rareapp-122f6.firebaseio.com/sample.json",
        this.state.sample
      )
      .then((response) => {
        return "";
      });
```
И происходит обновление списка запросов:
```js
    await axios("https://rareapp-122f6.firebaseio.com/sample.json").then(
      (response) => {
        this.setState({ sampleList: response.data });
      }
    );
```
При нажатии на крестик в одном из запросов, запрос удалится и локально, и с сервера:
```js
  sampleRemove = async (id) => {
    let sampleList = { ...this.state.sampleList };
    delete sampleList[id];
    this.setState({ sampleList: sampleList });
    await axios.delete(
      `https://rareapp-122f6.firebaseio.com/sample/${id}.json`
    );
  };
```

### Логин / Регистрация <a name="login_register"></a>
Таким образом реализован запрос на логинизацию (авторизованные пользователи хранятся на сервере Google Firebase):
```js
loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.state.key}`,
        authData
      );
      if (response.data.idToken) {
        const formControls = { ...this.state.formControls };
        formControls.email.value = "";
        formControls.password.value = "";
        this.setState({
          auth: true,
          showModal: false,
          error: "",
          formControls: formControls,
        });
      }
    } catch (e) {
      this.setState({ error: "Ошибка!" });
    }
  };
```
Схожим образом реализован запрос на регистрацию (новый пользователь фиксируется на сервере Google Firebase):
```js
  registerHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.state.key}`,
        authData
      );
      if (response.data.idToken) {
        const formControls = { ...this.state.formControls };
        formControls.email.value = "";
        formControls.password.value = "";
        this.setState({
          auth: true,
          showModal: false,
          error: "",
          formControls: formControls,
        });
      }
    } catch (e) {
      this.setState({ error: "Ошибка!" });
    }
  };
```
