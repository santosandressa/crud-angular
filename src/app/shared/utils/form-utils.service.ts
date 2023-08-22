import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormUtilsService {
  constructor() {}

  getErrorMessage(formGroup: UntypedFormGroup, fieldName: string) {
    const field = formGroup.get(fieldName) as UntypedFormControl;

    return this.getErrorMessageFromField(field);
  }

  getErrorMessageFromField(field: UntypedFormControl) {
    if (field?.hasError('required')) {
      return 'Campo Obrigatório';
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors
        ? field.errors['minlength'].requiredLength
        : 5;

      return `Deve ter no mínimo ${requiredLength} caracteres`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors
        ? field.errors['maxLength'].requiredLength
        : 100;

      return `Deve ter no máximo ${requiredLength} caracteres`;
    }

    return 'Campo Obrigatório';
  }

  getFormArrayFieldErrorMessage(formGroup: UntypedFormGroup, formArrayName: string,
    fieldName: string, index: number) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;

    const field = formArray.controls[index].get(
      fieldName
    ) as UntypedFormControl;

    return this.getErrorMessageFromField(field);
  }

  isFormArrayRequired(formGroup: UntypedFormGroup, formArrayName: string) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    return formArray.invalid && formArray.hasError('required') && formArray.touched;
  }

  validateAllFormsFields(formGroup: UntypedFormGroup | UntypedFormArray) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup || control instanceof UntypedFormArray) {
        control.markAsTouched({ onlySelf: true });
        this.validateAllFormsFields(control);
      }
    });
  }
}
