import { Component, OnInit } from "@angular/core";
import {
  trigger,
  state,
  transition,
  style,
  animate,
  keyframes,
  useAnimation,
  query,
  animateChild,
  group,
  stagger
} from "@angular/animations";
import { bounceOutLeftAnimation, fadeInAnimation } from "../app.animations";

@Component({
  selector: "custom-todo",
  templateUrl: "./custom-todo.component.html",
  styleUrls: ["./custom-todo.component.css"],
  animations: [
    trigger("todosAnimation", [
      transition(":enter", [
        group([
          query("h1", [
            style({ transform: "translateY(-20px)" }),
            animate(1000)
          ]),
          //query("@todoAnimation", [animateChild()])
          query("@todoAnimation", [stagger(200, animateChild())])
          //the below blocks child changes
          // query("@todoAnimation", [
          //   stagger(200, [
          //     style({ opacity: 0, transform: "translateX(-20px)" }),
          //     animate(1000)
          //   ])
          // ])
          // query(".list-group-item", [
          //   stagger(200, [
          //     style({ opacity: 0, transform: "translateX(-20px)" }),
          //     animate(1000)
          //   ])
          // ])
        ])
      ])
    ]),
    trigger("todoAnimation", [
      transition(":enter", [
        useAnimation(fadeInAnimation, {
          params: {
            duration: "500ms"
          }
        })
      ]),
      transition(":leave", [
        style({ backgroundColor: "red" }),
        animate(1000),
        useAnimation(bounceOutLeftAnimation)
      ])
    ])
  ]
})
export class CustomTodoComponent {
  items: any[] = [
    "Wash the dishes",
    "Call the accountant",
    "Apply for a car insurance"
  ];

  addItem(input: HTMLInputElement) {
    this.items.splice(0, 0, input.value);
    input.value = "";
  }

  removeItem(item) {
    let index = this.items.indexOf(item);
    this.items.splice(index, 1);
  }

  animationStarted($event) {
    console.log($event);
  }

  animationDone($event) {
    console.log($event);
  }
}
