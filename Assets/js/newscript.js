$(document).ready(function () {
  const calendarEl = $("#calendar");
  const currentDayEl = $("#currentDay");
  const businessHours = { start: 9, end: 18 };

  const getOrdinalSuffix = (i) => {
    const j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) return `${i}st`;
    if (j == 2 && k != 12) return `${i}nd`;
    if (j == 3 && k != 13) return `${i}rd`;
    return `${i}th`;
  };

  const currentDay = `${dayjs().format("dddd, MMMM ")}${getOrdinalSuffix(
    dayjs().date()
  )}`;
  currentDayEl.text(currentDay);

  const getTimeRange = (hour) => ({
    start: new Date().setHours(hour, 0, 0, 0),
    end: new Date().setHours(hour + 1, 0, 0, 0),
  });

  const createTimeBlock = (hour) => {
    const { start, end } = getTimeRange(hour);
    const hourText = hour > 12 ? hour - 12 : hour;
    const am_pm = hour >= 12 ? "PM" : "AM";

    const $timeBlock = $("<div>")
      .attr("id", `hour-${hour}`)
      .addClass("row time-block");
    const $hour = $("<div>")
      .addClass("col-2 col-md-1 hour text-center py-3")
      .text(`${hourText} ${am_pm}`);
    const $textarea = $("<textarea>")
      .addClass("col-8 col-md-10 description")
      .attr("rows", "3");
    const $button = $("<button>")
      .addClass("btn saveBtn col-2 col-md-1")
      .attr("aria-label", "save");
    const $icon = $("<i>").addClass("fas fa-save").attr("aria-hidden", "true");

    $button.append($icon);
    $timeBlock.append($hour, $textarea, $button);
    calendarEl.append($timeBlock);

    if (start <= new Date() && new Date() < end) {
      $timeBlock.addClass("present");
    } else if (hour < new Date().getHours()) {
      $timeBlock.addClass("past");
    } else {
      $timeBlock.addClass("future");
    }
  };

  const saveEvent = function () {
    const text = $(this).siblings(".description").val();
    const hourIdBlock = $(this).closest(".time-block").attr("id");
    localStorage.setItem(hourIdBlock, text);
  };

  const retrieveEvents = () => {
    $(".time-block").each(function () {
      const hourId = $(this).attr("id");
      const savedText = localStorage.getItem(hourId);
      if (savedText) $(this).children(".description").val(savedText);
    });
  };

  for (let i = businessHours.start; i < businessHours.end; i++) {
    createTimeBlock(i);
  }

  $(".saveBtn").on("click", saveEvent);

  retrieveEvents();
});
