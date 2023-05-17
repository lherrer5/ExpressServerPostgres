## Design patterns

They help me define the creation of classes, NOT their use.
They are ONLY used in the context of object-oriented programming.


## PATRONES CREACIONALES

### Builder

Allows us to build complex objects step by step. The pattern allows us to produce different types and representations of an object using the same construction code.

```javascript
// Class ProfileBuilder
class ProfileBuilder {
  constructor() {
    this.profile = {};
  }

  setName(name) {
    this.profile.name = name;
    return this;
  }

  setAge(age) {
    this.profile.age = age;
    return this;
  }

  setGender(gender) {
    this.profile.gender = gender;
    return this;
  }

  setLocation(location) {
    this.profile.location = location;
    return this;
  }

  build() {
    return this.profile;
  }
}
```

### Factory

Provides an interface for creating objects in a superclass, while allowing subclasses to alter the type of objects to be created.

```javascript
class DiscountFactory {
  static createDiscount(discountType) {
    switch(discountType) {
      case '10%':
        return new TenPercentDiscount();
      case '20%':
        return new TwentyPercentDiscount();
      case '30%':
        return new ThirtyPercentDiscount();
      default:
        throw new Error('Invalid discount type.');
    }
  }
}

class TenPercentDiscount {
  applyDiscount(price) {
    return price - (price * 0.1);
  }
}

class TwentyPercentDiscount {
  applyDiscount(price) {
    return price - (price * 0.2);
  }
}

class ThirtyPercentDiscount {
  applyDiscount(price) {
    return price - (price * 0.3);
  }
}

// Use
const discount = DiscountFactory.createDiscount('10%');
const price = 100;
const finalPrice = discount.applyDiscount(price);
console.log(`Precio original: ${price}, Precio final con descuento: ${finalPrice}`);
```


```javascript
class Car {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }
}

class CarFactory {
  createCar(make, model) {
    return new Car(make, model);
  }
}

const factory = new CarFactory();
const myCar = factory.createCar('Honda', 'Civic');
console.log(myCar); // Output: Car { make: 'Honda', model: 'Civic' }
```

### Singleton

It allows us to ensure that a class has only one instance, while also providing a global access point to that instance.
Node natively works with this pattern for importing files.


```javascript
class DatabaseConnection {
  constructor() {
    if(!DatabaseConnection.instance) {
      // Lógica de conexión a la base de datos
      DatabaseConnection.instance = this;
    }

    return DatabaseConnection.instance;
  }

  query(query) {
    // Database query logic
  }
}

// Uso
const connection1 = new DatabaseConnection();
const connection2 = new DatabaseConnection();

console.log(connection1 === connection2); // true, son la misma instancia
```

```javascript
// Singleton
const mongoose = require('mongoose');

class Database {
  constructor() {
    if (!Database.instance) {
      mongoose.connect('mongodb://localhost:27017/myapp', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      Database.instance = mongoose.connection;
    }

    return Database.instance;
  }
}

module.exports = new Database();
```


## PATRONES DE ESTRUCTURA

### Adapter

Allows collaboration between objects with incompatible interfaces.
Adapt the object properties according to the requirement, eg a password is made private and encrypted.

```javascript
// Adapter to convert API product object to MongoDB product object
class ProductMongoDBAdapter {
  constructor(product) {
    this._product = product;
  }

  get id() {
    return this._product.id;
  }

  get name() {
    return this._product.name;
  }

  get description() {
    return this._product.description;
  }

  get price() {
    return this._product.price;
  }

  get image() {
    return this._product.image;
  }

  // Converts the tailored product object to a MongoDB document
  toMongoDocument() {
    return {
      _id: this._product.id,
      name: this._product.name,
      description: this._product.description,
      price: this._product.price,
      image: this._product.image,
    };
  }
}

// Controller to get the details of a product
async function getProduct(req, res) {
  const productId = req.params.productId;
  const productApi = await getProductFromApi(productId);

  // Create an adapter for the API product object
  const productMongoDBAdapter = new ProductMongoDBAdapter(productApi);

  // Converts the tailored product object to a MongoDB document
  const productMongoDBDocument = productMongoDBAdapter.toMongoDocument();

  // Looks up the MongoDB document in the database and returns the product details
  const productMongoDB = await ProductModel.findById(productMongoDBDocument._id);
  res.json(productMongoDB);
}

```

### Bridge

Allows you to split a large class, or a group of closely related classes, into two separate hierarchies (abstraction and implementation) that can be developed independently of each other.
Commonly used for authentications.

```javascript
//AuthProvider abstract class
class AuthProvider {
  constructor(strategy) {
    this.strategy = strategy;
  }

  authenticate(req, res, next) {
    this.strategy.authenticate(req, res, next);
  }
}

// Implementation of the strategy for Google
class GoogleAuthStrategy {
  authenticate(req, res, next) {
    // Google authentication logic
    // ...

    next();
  }
}

// Implementation of the strategy for Facebook
class FacebookAuthStrategy {
  authenticate(req, res, next) {
    // Facebook authentication logic
    // ...

    next();
  }
}

// Implementation of the strategy for Twitter
class TwitterAuthStrategy {
  authenticate(req, res, next) {
    // Twitter authentication logic
    // ...

    next();
  }
}

// Example of use in Express
app.post('/auth/google', new AuthProvider(new GoogleAuthStrategy()).authenticate);
app.post('/auth/facebook', new AuthProvider(new FacebookAuthStrategy()).authenticate);
app.post('/auth/twitter', new AuthProvider(new TwitterAuthStrategy()).authenticate);
```

## Decorator

Allows you to add functionality to objects by placing these objects inside special encapsulating objects that contain these functionality.

```javascript
const logger = (message) => console.log(message)

function loggerDecorator (logger) {
    return function (message) {
        logger.call(this, message)
        console.log("message logged at:", new Date().toLocaleString())
    }
}

const decoratedLogger = loggerDecorator(logger);
```

```javascript
@log
class ExampleClass {
  doSomething() {
    //
  }
}
```

## PATRONES DE COMPORTAMIENTO

### Observer

Allows you to define a subscription mechanism to notify multiple objects about any event that happens to the object they are observing.

```javascript
const EventEmitter = require('events');

// Defines a Subject class that inherits from EventEmitter
class Subject extends EventEmitter {
  constructor() {
    super();
    this.data = null;
  }

  setData(data) {
    this.data = data;
    // Emit a 'data-updated' event when data is updated
    this.emit('data-updated', data);
  }

  getData() {
    return this.data;
  }
}

// Defines an Observer class that listens for the event emitted by Subject
class Observer {
  constructor(subject) {
    this.subject = subject;
    this.subject.on('data-updated', this.onDataUpdated.bind(this));
  }

  onDataUpdated(data) {
    console.log(`Data actualizada: ${data}`);
  }
}

// Ejemplo de uso
const subject = new Subject();
const observer = new Observer(subject);

subject.setData('nueva data'); // expected output: 'Updated data: new data'

```

### Chain of Responsibility

Allows you to pass requests along a chain of handlers. Upon receiving a request, each handler decides whether to process it or pass it on to the next handler in the chain.

```javascript
// Defines a function that checks if a request is of a specific type
function isOfType(req, type) {
  return req.method === type;
}

// Defines a middleware that handles GET requests.
function handleGet(req, res, next) {
  if (isOfType(req, 'GET')) {
    console.log('Manejando una petición GET');
    res.send('Petición GET manejada');
  } else {
    next();
  }
}

// Defines a middleware that handles POST requests
function handlePost(req, res, next) {
  if (isOfType(req, 'POST')) {
    console.log('Manejando una petición POST');
    res.send('Petición POST manejada');
  } else {
    next();
  }
}

// Defines a middleware that handles PUT requests
function handlePut(req, res, next) {
  if (isOfType(req, 'PUT')) {
    console.log('Manejando una petición PUT');
    res.send('Petición PUT manejada');
  } else {
    next();
  }
}

// Defines a middleware that handles DELETE requests
function handleDelete(req, res, next) {
  if (isOfType(req, 'DELETE')) {
    console.log('Manejando una petición DELETE');
    res.send('Petición DELETE manejada');
  } else {
    next();
  }
}

// Defines a chain of middlewares to handle different types of requests
const requestHandlerChain = [
  handleGet,
  handlePost,
  handlePut,
  handleDelete
];

// Register middlewares in a specific path
app.use('/api', requestHandlerChain);
```