import TextQuestion from "./TextQuestion";
import DateQuestion from "./DateQuestion";
import MonthAndYearQuestion from "./MonthAndYearQuestion";
import LongTextQuestion from "./LongTextQuestion";
import CheckboxListQuestion from "./CheckboxListQuestion";
import ComplexCheckboxListQuestion from "./ComplexCheckboxListQuestion";
import DataFedRadioQuestion from "./DataFedRadioQuestion";
import RadioQuestion from "./RadioQuestion";
import ComplexRadioQuestion from "./ComplexRadioQuestion";
import FileUploadQuestion from "./FileUploadQuestion";
import TabularDataQuestion from "./TabularDataQuestion";
import SelectQuestion from "./SelectQuestion";

export const QuestionComponents = {
  Address: TextQuestion,
  CheckboxList: CheckboxListQuestion,
  ComplexCheckboxList: ComplexCheckboxListQuestion,
  ComplexRadio: ComplexRadioQuestion,
  DataFed_CheckboxList: CheckboxListQuestion,
  DataFed_Radio: DataFedRadioQuestion,
  Date: DateQuestion,
  Email: TextQuestion,
  FileUpload: FileUploadQuestion,
  LongTextarea: LongTextQuestion,
  MonthAndYear: MonthAndYearQuestion,
  Number: TextQuestion,
  Radio: RadioQuestion,
  TabularData: TabularDataQuestion,
  Text: TextQuestion,
  Textarea: LongTextQuestion
  // Select: SelectQuestion
};
