We already said **Hello World!** with Angular 2 in [Getting Started with Angular 2  - Part 1 (Hello World!)](http://naywinmyint.com/getting-started-with-angular-2-part-1-hello-world/). Now, it is time to build something that is closer to a real-life application using some of **Angular 2** directives. In this post, I will guide you through the improved semantics of **Angular 2**, how we gonna use with built-in directives by developing a simple **To-do list** app together.

> You can also see the list of syntaxes, directives and configuration, etc.. of Angular 2 at https://angular.io/docs/ts/latest/cheatsheet.html.

#Improved semantics
When we wrote **Angular 1.x** directives, the understanding of the attribute values is needed to distinguish between literals, expressions, callbacks, and a micro-syntax. However, **Angular 2** introduces a few simple conventions to eliminate this problem. The improved semantics that we have to use in **Angular 2** are like:

    propertyName="value"

    // example
    <input bind-value="foo">

This is quite simple. It means that the `propertyName` attribute accepts a string literal as a value. The Angular's job is done once the value is accepted by attribute.

    [propertyName]="expression"

    // example
    <input [value]="foo.completed">

Once Angular finds an attribute surrounded by brackets, it handles the value of that attribute as an expression. This means that we need to use this syntax if we want to set a non-string value or result of an expression.

    (eventName)="handler()"

    // example
     <button (click)="handler()">Click me</button>

We will use this syntax when we want a component bound to events. In this syntax, we are handling the events called `eventName` with the `handler()` expression.

#A simple to-do list app
Now, let's start building a simple to-do list app by using **Angular 2** built-in directives.

To continue this tutorial, you should have the working Angular 2 **Hello world!** app that we developed in previous post, [Getting Started with Angular 2  - Part 1 (Hello World!)](http://naywinmyint.com/getting-started-with-angular-2-part-1-hello-world/) or you could simply clone the official QuickStart seed by Angular team, maintained on [github](https://github.com/angular/quickstart.git):

> I recommended sticking our Hello world project as this tutorial is based on [Angular 2  - Part 1](http://naywinmyint.com/getting-started-with-angular-2-part-1-hello-world/) and there will be a slight difference in code.

----
<div class="body-flex-ads">
     <div class="body-left-ads">  
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Large Rec Ads - Left -->
<ins class="adsbygoogle"
     style="display:inline-block;width:336px;height:280px"
     data-ad-client="ca-pub-8943853719026260"
     data-ad-slot="4534889435"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
</div>
<div class="body-right-ads">
      <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Large Rec Ads - Right -->
<ins class="adsbygoogle"
     style="display:inline-block;width:336px;height:280px"
     data-ad-client="ca-pub-8943853719026260"
     data-ad-slot="2571975034"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
     </div>
</div>
----

##Cloning the seed project

*If you do not have the Hello world project, you can clone the seed project from github as following. You can skip this step if you already have one.*

```
git clone https://github.com/NayWinMyint/angular2-seed.git angular2-todo-list-app
cd angular2-todo-list-app
rm -rf .git
npm install

// once npm install is finished
npm start
```

##Add a Todo list
We will make some modification to **app.component.ts** file located inside **app** folder. Rename `target` property to `name` and add a list of `todos`. The **app.component.ts** will be as following after modified.

```
// angular2-todo-list-app/app/app.component.ts

import { Component } from 'angular2/core';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.html'
})
export class AppComponent {
  name: string;
  todos: string[];
     constructor() {
       this.name = 'Nay';
       this.todos= ['Learn Angular 2', 'Go to market', 'Take a break'];
     }
}
```

##The ngFor directive
The `ngFor` is a upgraded form of `ng-repeat` in **Angular 1.x** that allows us to loop over a collection of items. Angular 2 took the `ng-repeat` idea from **Angular 1.x** and migrated to `ngFor`, which allows more sophisticated tooling by introducing further semantics on top of it. When we are using `ngFor`, we can see two different syntaxes as following.

```
// ngFor syntax with help `template` element
<ul>
    <template ngFor var-todo [ngForOf]="todos">
       <li>{{todo}}</li>
    </template>
</ul>


// ngFor syntax with help `template` element
<ul>
    <li *ngFor="#todo of todos">{{todo}}</li>

    (or)

    <li *ngFor="let todo of todos">{{todo}}</li>
</ul>
```
The brackets surrounded the `ngForOf` attribute might seem like invalid HTML first. However, it is valid as the use of brackets is permitted in attribute names according to HTML specification.

>The `template` element in the first example makes sure that the markup wrapped inside it won't be rendered by the browser and it let the template engine to process them later.

However, you should stick to the latest version of `ngFor` that uses `*` symbol and `let` declaration, which is also used in the official tutorial. `*` represents as the prefix of the used directive that save us from typing down the entire template element explicitly. The reason behind using `let` declaration is simple that making `todo` variable only accessible with its block, `li` in this case.


###Adding the ngFor directive
Now, let's add the `ngFor` in `app.html` to show a list of todos with the following content.

```
<!-- angular2-todo-list-app/app/app.html -->

<h1>Hello {{name}}!</h1>
<p>
  Here's a list of the things I need to do:
</p>
<ul>
  <template ngFor var-todo [ngForOf]="todos">
    <li>
        {{todo}}
    </li>
  </template>
</ul>
```

After you clicked **Save** in your text editor, you can see the result in your browser as the following screenshot.

![Simple todo list](/content/images/2016/11/Screen-Shot-2016-11-29-at-12.51.24.png)


##To-Do Application

Now, let's convert our todo lists to a simple to-do application that allows us to:

* Adding a new todo item from text input
* Checking the done todo item with checkbox.

###app.component.ts
First, we will make some changes again to **app.component.ts** by adding the `ViewEncapsulation` module from angular2 core, a `Todo interface` and some metadata associated with it like the following content.


```
// angular2-todo-list-app/app/app.component.ts

import { Component, ViewEncapsulation } from 'angular2/core';

interface Todo {
  completed: boolean;
  label: string;
}

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.html',
  styles: [
    `ul li {
      list-style: none;
    }
    .completed {
      text-decoration: line-through;
    }`
  ],
  encapsulation: ViewEncapsulation.Emulated
})
```

----
<div class="body-flex-ads">
     <div class="body-left-ads">  
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Large Rec Ads - Left -->
<ins class="adsbygoogle"
     style="display:inline-block;width:336px;height:280px"
     data-ad-client="ca-pub-8943853719026260"
     data-ad-slot="4534889435"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
</div>
<div class="body-right-ads">
      <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Large Rec Ads - Right -->
<ins class="adsbygoogle"
     style="display:inline-block;width:336px;height:280px"
     data-ad-client="ca-pub-8943853719026260"
     data-ad-slot="2571975034"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
     </div>
</div>
----

####Component's view encapsulation
The shadow DOM is the core feature of Angular 2 that is inspired from Web Components, which allows us to encapsulate the styles of our Web Components without allowing them to leak outside the component's scope.
Angular 2 provide that feature with the `ViewEncapsulation` module. It is a ENUM type class, which has three values of `Emulated`, `Native`, and `None`, that defines template and style encapsulation options available for Component module's Component.
If we want to use the shadow DOM to render, we can use `ViewEncapsulation.Native`. `ViewEncapsulation.Emulated` will help us getting the same level of encapsulation without using the shadow DOM as the shadow DOM is not supported by all browsers yet. Finally, `ViewEncapsulation.None` can be used if we do not want to have any encapsulation at all. Angular will use the type `Emulated` as the default encapsulation renderer value.

After making changes to `Component`, it is time to modify our controller class `AppComponent` by adding some functions to add, remove and finish todo tasks. The modified `AppComponent` class should be like following.

```
export class AppComponent {
  todos: Todo[] = [{
      label: 'Learn Angular 2',
      completed: false
  }, {
      label: 'Go to market',
      completed: false
  }];
  name: string = 'Nay';
  addTodo(label) {
    this.todos.push({
      label,
      completed: false
    })
  }
  removeTodo(idx) {
    this.todos.splice(idx, 1);
  }
  toggleCompletion(idx) {
    let todo = this.todos[idx];
    todo.completed = !todo.completed;
  }
}
```

###app.html
Now, let's update the template and render these items from our controller class. Here the completed template is done:

```
<!-- angular2-todo-list-app/app/app.html -->

<h1>Hello {{name}}!</h1>
<p>
  Here's a list of the things I need to do:
</p>
<ul>
    <li *ngFor="#todo of todos; var index = index" [class.completed]="todo.completed">
      <input type="checkbox" [checked]="todo.completed" (change)="toggleCompletion(index)">
        {{todo.label}}
    </li>
</ul>
```

The binding in the Angular 2 gives us limitless control on our template element's styles and attributes more than ever. For instance, we can bind to the `td` element's `colspan` attribute like following code:

`<td [attr.colspan] = "colspanCount"></td>`

> The changed made here are very simple to understand and already described at the beginning of this post.


###Handling user actions - Text input
We have already experienced the handling user actions in `toggleCompletion` method. It simply toggles the `completed` **Boolean** associated with the current to-do item, which is determined by the index passed to the method.

Now, we will add a text input to `app.html` template file to add new todo items to our lists.

```
<p>
    Add a new todo:
    <input #newtodo type="text">
    <button (click)="addTodo(newtodo.value); newtodo.value = ''" type="button">
      Add
    </button>
</p>
```


###Congratulations
You have successfully developed **a to-do list application with Angular 2**, which is a lot look like the following screenshot.

![to-do list application with Angular 2](/content/images/2016/11/Untitled.gif)


In this tutorial, we have learnt how the Angular 2 semantics are improved and more efficient than those of Angular 1.x. But this is just a start and we have much things learn about **Angular 2** still in directives, components' inputs and outputs and their life cycle, so on... See you soon at Getting Started with Angular 2  - Part 3 (???).

Thank you for reading this post and your sharing makes my day if you enjoy this post. Cheers.




































>The brackets surrounded the `ngForOf` attribute might seem like 
