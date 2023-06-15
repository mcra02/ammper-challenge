export interface Value {
  code: string
  label: string
  validation: string
  validation_message: string
  placeholder: string
}

export interface Feature {
  name: string
  description: string
}

export interface FormField {
  name: string
  type: string
  label?: string
  validation?: string
  placeholder?: string
  validation_message?: string
  length?: string
  optional?: boolean
  values?: Value[]
  pre_selected?: number
}

export interface Institution {
  id: number
  name: string
  type: string
  code?: string
  website: any
  display_name: string
  country_code: string
  country_codes: string[]
  primary_color: string
  logo?: string
  icon_logo?: string
  text_logo?: string
  form_fields: FormField[]
  customization: any
  features: Feature[]
  integration_type: string
  status: string
  resources: string[]
  openbanking_information: any
}
