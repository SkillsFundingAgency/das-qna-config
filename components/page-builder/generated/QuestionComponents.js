import TextQuestion from "./TextQuestion";
import DateQuestion from "./DateQuestion";
import LongTextQuestion from "./LongTextQuestion";
import CheckboxQuestion from "./CheckboxQuestion";
import RadioQuestion from "./RadioQuestion";
import ComplexRadioQuestion from "./ComplexRadioQuestion";
import HiddenQuestion from "./HiddenQuestion";
import FileUploadQuestion from "./FileUploadQuestion";
import TabularDataQuestion from "./TabularDataQuestion";
import SelectQuestion from "./SelectQuestion";

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
  Number: TextQuestion,
  Radio: RadioQuestion,
  TabularData: TabularDataQuestion,
  Text: TextQuestion,
  Textarea: LongTextQuestion,
  Hidden: HiddenQuestion
  // Select: SelectQuestion
};
