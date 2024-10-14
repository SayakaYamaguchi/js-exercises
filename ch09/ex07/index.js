/*
## 問題 9.7 💻
継承を使う場合、サブクラスがスーパークラスの実装を引き継ぐため、クラス間の依存性が強くなる。
これにより、特に大きい継承ツリーでは、あるクラスの変更がほかのクラスに影響を与えたり、無理にコードを共通化することで、
不要な振る舞いや属性を持ったクラスができるという問題がある。
以下は `Animal` クラスを継承して様々な動物クラスを実装する例である。
```ts
class Animal {
  eat() {
    ...
  }
}

class Dog extends Animal {
  bite() {
    ...
  }
}

class Husky extends Dog {
  ...
}

class Cat extends Animal {
  scratch() {
    ...
  }
}

class Bird extends Animal {
  fly() {
    ...
  }
}

class Fish extends Animal {
  swim() {
    ...
  }
}
```

この例では動物として共通の"食べる"という振る舞い `eat()` を各動物が継承する。
ここに"鳴く"という振る舞い `makeSound()` を追加することを考える。
犬、猫、鳥は鳴くので `makeSound()` を共通の振る舞いとして利用したいが、スーパークラスに `makeSound()` を追加すると `Fish` は不要な振る舞いを持つことになる。

継承のかわりに合成(composition)を用いてこの問題を回避しなさい。

**出題範囲**: 9.5.3
 */
// AnimalBehavior インターフェースは動物の振る舞いを定義します
class AnimalBehavior {
  _eat() {
    console.log("Eating...");
  }

  _makeSound() {
    console.log("Making sound...");
  }
}

class Dog {
  constructor() {
    this._behavior = new AnimalBehavior();

    this.bite = () => {
      console.log("Biting...");
    };

    // eat() メソッドを公開
    this.eat = () => {
      this._behavior._eat();
    };

    // makeSound() メソッドを公開
    this.makeSound = () => {
      this._behavior._makeSound();
    }
  }

}

class Cat {
  constructor() {
    this._behavior = new AnimalBehavior();

    this.scratch = () => {
      console.log("Scratching...");
    };
  
    // AnimalBehavior クラスのメソッドを利用
    this.eat = () => {
      this._behavior._eat();
    };

    // AnimalBehavior クラスのメソッドを利用
    this.makeSound = () => {
      this._behavior._makeSound();
    };
  }


}

class Bird {
  constructor() {
    this._behavior = new AnimalBehavior();

    this.fly = () => {
      console.log("Flying...");
    }
  
    // AnimalBehavior クラスのメソッドを利用
    this.eat = () => {
      this._behavior._eat();
    }
  
    // AnimalBehavior クラスのメソッドを利用
    this.makeSound = () => {
      this._behavior._makeSound();
    }
  
  }

}

class Fish {
  constructor() {
    this._behavior = new AnimalBehavior();

    this.swim = () => {
      console.log("Swimming...");
    }
  
    // AnimalBehavior クラスのメソッドを利用
    this.eat = () => {
      this._behavior._eat();
    }
  
  }

}



const dog = new Dog();
dog.bite(); // Biting...
dog.eat(); // Eating...
dog.makeSound(); // Making sound...

const cat = new Cat();
cat.scratch(); // Scratching...
cat.eat(); // Eating...
cat.makeSound(); // Making sound...

const bird = new Bird();
bird.fly(); // Flying...
bird.eat(); // Eating...
bird.makeSound(); // Making sound...

const fish = new Fish();
fish.swim(); // Swimming...
fish.eat(); // Eating...


