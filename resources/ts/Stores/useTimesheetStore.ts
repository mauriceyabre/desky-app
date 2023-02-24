import { defineStore } from "pinia";
import TimeLog from "@Models/TimeLog"
import moment from "moment";

interface State {
    all: TimeLog[],
    filter: {
        date: Date | null
    }
}

function groupByDateRange(started_at: moment.Moment, end: moment.Moment, logs?: TimeLog[]) {
    let dates: { [key: string]: TimeLog[] } = {};
    while (started_at.startOf('day').isSameOrAfter(end.startOf('day'))) {
        const endDate = started_at.format('YYYY-MM-DD')
        dates[endDate] = logs?.filter(log => log.date === endDate) ?? [];
        started_at.subtract(1, "day");
    }
    return dates;
}

export const useTimesheetStore = defineStore({
    id: 'timesheetStore',
    state: (): State => {
        return {
            all: [],
            filter: {
                date: null
            }
        }
    },
    getters: {
        thisMonth(state) {
            const logs = state.all.filter(log => moment(log.started_at).isSame(moment(), 'month')) as TimeLog[]
            const duration = logs.reduce((a, b) => a + b.duration, 0)
            const overtime = logs.reduce((a, b) => a + b.overtime, 0)
            return {
                logs: logs,
                count: logs.length,
                duration: duration,
                overtime: overtime,
                workedDays: new Set(logs.map(log => log.date)).size,
                formattedDuration: `${ Math.floor(duration / 60)}h ${ duration % 60 }m`,
                formattedOvertime: `${ Math.floor(overtime / 60) }h ${ overtime % 60 }m`
            }
        },
        today(state) {
            return {
                logs: state.all.filter(log => moment(log.started_at).isSame(moment(), 'day'))
            }
        },
        latest30Days(state) {
            const range = 14;
            const logs = state.all.filter(log => moment(log.started_at).isSameOrAfter(moment().subtract(range, 'days'), 'day'))
            const filteredLogs = groupByDateRange(moment(), moment().subtract(range, "days"), logs)
            const duration = logs.reduce((a, b) => a + b.duration, 0)
            const overtime = logs.reduce((a, b) => a + b.overtime, 0)
            const durationsArray = Object.values(filteredLogs).map(group => group.reduce((a, b) => a + b.duration, 0)) as number[]
            return {
                logs: logs,
                count: logs.length,
                duration: duration,
                overtime: overtime,
                workedDays: new Set(logs.map(log => log.date)).size,
                formattedDuration: `${Math.floor(duration / 60)}h ${duration % 60}m`,
                formattedOvertime: `${Math.floor(overtime / 60)}h ${overtime % 60}m`,
                groupedByDays: {
                    days: Object.keys(filteredLogs),
                    logs: filteredLogs,
                    durations: durationsArray,
                    hourlyDurations: durationsArray.map(duration => Math.round(duration / 60 * 2) / 2)
                }
            }
        },
        selectedLogs(state): TimeLog[] {
            if (state.filter.date) {
                return state.all.filter(log => moment(state.filter.date).isSame(log.started_at, 'day')) as TimeLog[];
            }
            return [];
        }
    },
    actions: {
        setTimeLogs(logs: Object) {
            this.all = Object.values(logs).map(log => new TimeLog(log))
                .sort((a, b) => moment(b.started_at).valueOf() - moment(a.started_at).valueOf());
        }
    }
})
