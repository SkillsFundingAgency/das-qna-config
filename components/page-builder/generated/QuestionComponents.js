import TextQuestion from "./TextQuestion";
import DateQuestion from "./DateQuestion";
import NumberQuestion from "./NumberQuestion";
import LongTextQuestion from "./LongTextQuestion";
import CheckboxQuestion from "./CheckboxQuestion";
import RadioQuestion from "./RadioQuestion";
import ComplexRadioQuestion from "./ComplexRadioQuestion";
import HiddenQuestion from "./HiddenQuestion";
import FileUploadQuestion from "./FileUploadQuestion";
import TabularDataQuestion from "./TabularDataQuestion";
import DropdownQuestion from "./DropdownQuestion";
import ChecklistQuestion from "./ChecklistQuestion";

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
  TabularData: TabularDataQuestion,
  Text: TextQuestion,
  Textarea: LongTextQuestion,
  Hidden: HiddenQuestion
  // longText: LongTextQuestion,
  // checkbox: CheckboxQuestion,
  // checklist: ChecklistQuestion,
  // dropdown: DropdownQuestion
};
