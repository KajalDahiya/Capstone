import { Directive, HostBinding, HostListener, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { fileHandle } from './_model/file-handle.model';

import { EventEmitter} from "@angular/core"

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

  @Output() files: EventEmitter<fileHandle>=new EventEmitter();
  @HostBinding("style.background")
  private background="#eee";
  sanitizer: any;

  constructor() { }

  @HostListener("dragover",["$event"])
  public onDragOver(evt:DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background="#999";
  }
  @HostListener("dragleave",["$event"])
  public onDragLeave(evt:DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background="#eee";
  }
//   @HostListener("drop", ["$event"])
// public onDrop(evt: DragEvent) {
//   evt.preventDefault();
//   evt.stopPropagation();
//   this.background = "#eee";

//   let fileHandle: FileHandle = null;

//   if (evt.dataTransfer?.files?.length) {
//     const file = evt.dataTransfer.files[0];
//     const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
//     fileHandle = { file, url };
//     this.files.emit(fileHandle);
//   }
}






 
