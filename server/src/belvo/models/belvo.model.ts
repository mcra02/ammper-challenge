import { ApiProperty } from '@nestjs/swagger';

export class BelvoPagination {
  @ApiProperty()
  count: number;

  @ApiProperty()
  next: any;

  @ApiProperty()
  previous: any;

  @ApiProperty({ type: () => [ Institution ] })
  results: Institution[];
}

export class Institution {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  code?: string;

  @ApiProperty()
  website: any;

  @ApiProperty()
  display_name: string;

  @ApiProperty()
  country_code: string;

  @ApiProperty()
  country_codes: string[];

  @ApiProperty()
  primary_color: string;

  @ApiProperty()
  logo?: string;

  @ApiProperty()
  icon_logo?: string;

  @ApiProperty()
  text_logo?: string;

  @ApiProperty({ type: () => [ FormField ] })
  form_fields: FormField[];

  @ApiProperty()
  customization: any;

  @ApiProperty({ type: () => [ Feature ] })
  features: Feature[];

  @ApiProperty()
  integration_type: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  resources: string[];

  @ApiProperty()
  openbanking_information: any;

}

export class FormField {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  label?: string;

  @ApiProperty()
  validation?: string;

  @ApiProperty()
  placeholder?: string;

  @ApiProperty()
  validation_message?: string;

  @ApiProperty()
  length?: string;

  @ApiProperty()
  optional?: boolean;

  @ApiProperty({ type: () => [ Value ] })
  values?: Value[];

  @ApiProperty()
  pre_selected?: number;

}

export class Value {
  @ApiProperty()
  code: string;

  @ApiProperty()
  label: string;

  @ApiProperty()
  validation: string;

  @ApiProperty()
  validation_message: string;

  @ApiProperty()
  placeholder: string;

}

export class Feature {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

}
