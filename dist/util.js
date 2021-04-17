export function combo(arr) {
    const res = [];
    for (let i = 0; i < arr.length; i++)
        for (let j = i + 1; j < arr.length; j++)
            res.push([arr[i], arr[j]]);
    return res;
}
