import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'clipcode-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.css']
})
export class YesNoDialogComponent {
  titleText = '';
  contentText = '';
  yesText = '';
  noText = '';
  showNoText = true;

  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<YesNoDialogComponent>
    ) {
      this.titleText = data.titleText;
      this.contentText = data.contentText;
      this.yesText = data.yesText;
      this.noText = data.noText;
      this.showNoText = data.showNoText;
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
