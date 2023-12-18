import { Component } from '@angular/core';

interface Donor {
  id: number;
  name: string;
  bloodGroup: string;
  contact: string;
  address: string;
}

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent {
  donors: Donor[] = [];
  newDonor: Donor = {} as Donor;
  editedDonor: Donor = {} as Donor;
  isEditing = false;
  searchKeyword = '';

  addDonor(): void {
    this.newDonor.id = this.donors.length + 1;
    this.donors.push({ ...this.newDonor });
    this.newDonor = {} as Donor;
  }

  editDonor(donor: Donor): void {
    this.isEditing = true;
    this.editedDonor = { ...donor };
  }

  saveEditedDonor(): void {
    const index = this.donors.findIndex(donor => donor.id === this.editedDonor.id);
    if (index !== -1) {
      this.donors[index] = { ...this.editedDonor };
    }
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editedDonor = {} as Donor;
  }

  deleteDonor(donor: Donor): void {
    this.donors = this.donors.filter(item => item.id !== donor.id);
  }

  get filteredDonors(): Donor[] {
    return this.donors.filter(donor =>
      donor.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  }
}
