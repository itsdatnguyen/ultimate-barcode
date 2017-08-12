import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


export enum CodeGeneratorOption {
    Download
}

export interface CodeGeneratorInfo {
    name: string;
    icon: string;
    option: CodeGeneratorOption;
}

@IonicPage()
@Component({
  selector: 'page-code-generator-options',
  templateUrl: 'code-generator-options.html',
})
export class CodeGeneratorOptionsPage {

    options: CodeGeneratorInfo[] = [
        { name: 'Download', icon: 'download', option: CodeGeneratorOption.Download }
    ]

    constructor(private viewController: ViewController) {
        
    }

    optionClicked($event, option: CodeGeneratorOption) {
        this.viewController.dismiss(option);
    }
}
