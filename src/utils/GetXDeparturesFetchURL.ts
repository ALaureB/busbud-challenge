export default function getXDeparturesFetchURL(origin: string, destination: string, date: string): string {
    return `/x-departures/${origin}/${destination}/${date}/poll`
}
