import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as Material from "@angular/material";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatToolbarModule,
    Material.MatDialogModule,
    Material.MatIconModule,
    Material.MatButtonModule,
    Material.MatProgressSpinnerModule,
    Material.MatPaginatorModule,
    Material.MatTableModule,
  ],
  exports: [
    Material.MatToolbarModule,
    Material.MatTableModule,
    Material.MatDialogModule,
    Material.MatIconModule,
    Material.MatButtonModule,
    Material.MatPaginatorModule,
    Material.MatProgressSpinnerModule,
  ],
})
export class MaterialModule {}
