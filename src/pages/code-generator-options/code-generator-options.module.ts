import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CodeGeneratorOptionsPage } from './code-generator-options';

@NgModule({
    declarations: [
        CodeGeneratorOptionsPage,
    ],
    imports: [
        IonicPageModule.forChild(CodeGeneratorOptionsPage),
    ],
    exports: [
        CodeGeneratorOptionsPage
    ]
})
export class CodeGeneratorOptionsPageModule {}
