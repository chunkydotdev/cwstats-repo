export interface DataCollection {
    labels: string[];
    datasets: Dataset[];
}

export interface Dataset {
    label: string;
    backgroundColor: string;
    fill: boolean;
    borderColor: string;
    data: number[];
}
