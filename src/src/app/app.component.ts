import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SUPPORTED_LANGUAGES } from './languages';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public title = 'TimeTable';

    constructor(translate: TranslateService) {
        translate.setDefaultLang('en');
        // translate.use("en");
        translate.addLangs(
            SUPPORTED_LANGUAGES.map((language) => language.code)
        );

        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|hu/) ? browserLang : 'en');
    }
}
