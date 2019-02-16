import {
    mmToMetric,
    mmToImperial,
    metricToMm,
    imperialToMm,
} from './converter';

test("Peittha to KG", () => {
    expect( mmToMetric(2) ).toBe(3.27);
});

test("Peittha to Pound", () => {
    expect( mmToImperial(3) ).toBe(10.8);
});

test("KG to Peittha", () => {
    expect( metricToMm(4) ).toBe(2.45);
});

test("Pound to Peittha", () => {
    expect( imperialToMm(3) ).toBe(0.83);
});
