import TextQuestion from "./TextQuestion";
import DateQuestion from "./DateQuestion";
import NumberQuestion from "./NumberQuestion";
import LongTextQuestion from "./LongTextQuestion";
import CheckboxQuestion from "./CheckboxQuestion";
import RadioQuestion from "./RadioQuestion";
import ComplexRadioQuestion from "./ComplexRadioQuestion";
import DropdownQuestion from "./DropdownQuestion";
import ChecklistQuestion from "./ChecklistQuestion";
import FileUploadQuestion from "./FileUploadQuestion";

export const QuestionComponents = {
  Address: TextQuestion, // needs own component
  CheckBoxList: CheckboxQuestion,
  ComplexRadio: ComplexRadioQuestion,
  DataFed_CheckboxList: CheckboxQuestion,
  Date: DateQuestion,
  Email: TextQuestion,
  FileUpload: FileUploadQuestion, // needs own component
  LongTextarea: LongTextQuestion,
  MonthAndYear: DateQuestion, // needs own component
  Number: NumberQuestion,
  Radio: RadioQuestion,
  Text: TextQuestion,
  Textarea: LongTextQuestion
  // longText: LongTextQuestion,
  // checkbox: CheckboxQuestion,
  // checklist: ChecklistQuestion,
  // dropdown: DropdownQuestion
};
