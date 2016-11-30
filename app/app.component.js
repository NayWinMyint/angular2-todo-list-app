// angular2-todo-list-app/app/app.component.ts
System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.todos = [{
                            label: 'Learn Angular 2',
                            completed: false
                        }, {
                            label: 'Go to market',
                            completed: false
                        }];
                    this.name = 'Nay';
                }
                AppComponent.prototype.addTodo = function (label) {
                    this.todos.push({
                        label: label,
                        completed: false
                    });
                };
                AppComponent.prototype.removeTodo = function (idx) {
                    this.todos.splice(idx, 1);
                };
                AppComponent.prototype.toggleCompletion = function (idx) {
                    var todo = this.todos[idx];
                    todo.completed = !todo.completed;
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'todo-app',
                        templateUrl: 'app/app.html',
                        styles: [
                            "ul li {\n      list-style: none;\n    }\n    .completed {\n      text-decoration: line-through;\n    }"
                        ],
                        encapsulation: core_1.ViewEncapsulation.Emulated
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map