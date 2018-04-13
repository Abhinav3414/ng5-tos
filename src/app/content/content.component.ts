import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'content',
  templateUrl: './content.html',
})
export class ContentComponent {
  items: any[];
  title = 'Team Operations System';

  constructor(private router: Router, private route: ActivatedRoute) {}
    ngOnInit() {

    }

}
