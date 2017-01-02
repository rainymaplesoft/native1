import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { TextField } from "ui/text-field";
import { GroceryService } from "../../shared/grocery/grocery.service";
import { Grocery } from "../../shared/grocery/grocery";

@Component(
    {
        selector: "list",
        templateUrl: "pages/list/list.html",
        styleUrls: ['pages/list/list.common.css', 'pages/list/list.css']
    }
)
export class ListComponent implements OnInit {
    groceryList: Array<Grocery> = [];
    grocery = "";
    isLoading = false;

    @ViewChild('groceryTextField') groceryTextField: ElementRef;

    constructor(private groceryService: GroceryService) {

    }

    ngOnInit() {
        this.isLoading = true;
        this.groceryService.loadList()
            .subscribe(
            data => {
                this.groceryList = data;
                this.isLoading = false;
            },
            () => alert("Failed to get grocery list")
            );
    }

    add() {
        if (this.grocery.trim() === "") {
            return;
        }

        // Dismiss the keyboard
        let textField = <TextField>this.groceryTextField.nativeElement;
        textField.dismissSoftInput();

        this.groceryService.add(this.grocery)
            .subscribe(newGrocery => {
                this.groceryList.push(newGrocery);
                this.grocery = '';
            },
            () => {
                alert({
                    message: 'Failed to add new grocery',
                    okButtonText: 'OK'
                });
                this.grocery = '';
            });
    }
}