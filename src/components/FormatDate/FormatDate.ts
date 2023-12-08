export class FormatDate {
  private date: Date;
  daysOfWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor(date: string) {
    this.date = new Date(date);
  }

  apiFormatDate() {
    return this.date.toISOString().slice(0, 10);
  }

  toStringFormatDate() {
    const dayOfWeek = this.daysOfWeek[this.date.getDay()];
    const month = this.months[this.date.getMonth()];
    const dayOfMonth = this.date.getDate();
    const year = this.date.getFullYear();
    return `${dayOfWeek} ${month} ${dayOfMonth}, ${year}`;
  }
}