import { computed } from "vue";
import TimeLog from "@Models/TimeLog";
import moment from "moment";
import { useTimesheetStore } from "@Stores/useTimesheetStore";

export default function useTimesheet(timeLogsObject: Object) {
    const store = useTimesheetStore();

    store.setTimeLogs(timeLogsObject);

    // Ordered by CREATED_AT
    const timeLogs = computed<TimeLog[]>(() => store.all);

    // LASTEST TIMELOG
    const latestTimeLog = computed<TimeLog>(() => store.all[0] ?? [])

    // LASTEST TIMELOG
    //const latest30DaysLog = computed(() => store.last30Days ?? [])

    // TODAY TIMELOGS
    const todayTimeLogs = computed(() => timeLogs.value.filter(timeLog => moment(timeLog.date).isSame(moment(), 'day')))

    // THIS MONTH TIMELOGS
    const thisMonth = computed(() => store.thisMonth)

    // THIS YEAR TIMELOGS
    const thisYearTimeLogs = computed(() => timeLogs.value.filter(timeLog => moment(timeLog.date).isSame(moment(), 'year')))

    // TIME FILTERED TIMELOGS
    function timeFilteredLogs(range: 'day'|'month'|'quarter'|'year'|'yesterday'|'lastMonth'|'lastQuarter'|'lastYear' = 'day') {
        let newRange: 'day' | 'month' | 'quarter' | 'year';
        let date: moment.Moment;
        switch (range) {
            case "day":
            case "yesterday":
                newRange = 'day';
                date = moment().subtract(1, 'd');
                break;
            case "month":
            case "lastMonth":
                newRange = 'month';
                date = moment().subtract(1, 'M');
                break;
            case "quarter":
            case "lastQuarter":
                newRange = 'quarter';
                date = moment().subtract(1, 'Q');
                break;
            case "year":
            case "lastYear":
                newRange = 'year';
                date = moment().subtract(1, 'y');
                break;
        }
        if (['day', 'month', 'quarter', 'year'].includes(range)) {
            return timeLogs.value.filter(timeLog => moment(timeLog.date).isSame(moment(), newRange))
        } else if (['yesterday', 'lastMonth', 'lastQuarter', 'lastYear'].includes(range)) {
            return timeLogs.value.filter(timeLog => moment(timeLog.date).isSame(date, newRange))
        }
        return [];
    }

    const thisMonthWorkedMinutes = computed(() => timeFilteredLogs('month').reduce((a, b) => a + b.duration, 0))

    return {
        timeLogs,
        latestTimeLog,
        todayTimeLogs,
        thisMonth,
        thisYearTimeLogs,
        //latest30DaysLog,
        timeFilteredLogs,
        thisMonthWorkedMinutes
    }
}
