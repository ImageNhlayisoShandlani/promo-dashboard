import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { PromoTypesService } from '../../services/promo-types.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filter-panel',
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.scss'
})
export class FilterPanelComponent implements OnInit{

  category = '';
  status = '';
  startDate = '';
  promoTypes: string[] = [];
  isCategoryPage = false;


  constructor(private promoTypesService: PromoTypesService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.promoTypesService.getCategories().subscribe({
      next: data => this.promoTypes = data,
      error: err => console.log('Error fetching categories', err)
    });

    this.route.paramMap.subscribe(params => {
      const catId = params.get('promoType');
      this.isCategoryPage = !!catId;
    })
  }
  @Output() filtersChanged = new EventEmitter<{ category: string; status: string; startDate: string }>();

  emitFilters() {
    this.filtersChanged.emit({
      category: this.category,
      status: this.status,
      startDate: this.startDate
    });
  }

}
