import {
  Component,
  ViewChild,
  Input,
  forwardRef,
  Renderer2
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonInput } from '@ionic/angular';
import { noop } from 'rxjs';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileInputComponent),
      multi: true
    }
  ]
})
export class FileInputComponent implements ControlValueAccessor {
  onTouched: () => void = noop;
  onChange: (file: File | undefined) => void = noop;

  // private readonly dataTransfer: DataTransfer = new DataTransfer();

  @Input()
  readonly accept: string = '';

  @ViewChild(IonInput, { static: true })
  private readonly input: IonInput;

  constructor(private readonly renderer: Renderer2) {}

  writeValue(/* file: File | undefined | null */): void {
    // this.dataTransfer.clearData();

    // if (file instanceof File) {
    //   this.dataTransfer.items.add(file);
    // }

    // this.setInputProperty('files', this.dataTransfer.files);
    this.input.value = undefined;
  }

  registerOnChange(onChange: FileInputComponent['onChange']): void {
    this.onChange = file => file && onChange(file);
  }

  registerOnTouched(onTouched: FileInputComponent['onTouched']): void {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean): void {
    this.input.disabled = disabled;
  }
}
