import { get, post } from './http'

export function selectSaleData(data) {
    return get("/system/dataCenter/list", data);
}

export function updateSaleData(data) {
    return post("/system/dataCenter/update", data);
}
