import { Component, OnInit, HostListener } from '@angular/core';
import { CommonDataService } from "../../../Services/DataServices/common-data.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public dataService: CommonDataService) {

  }

  ngOnInit() {
  }
}
