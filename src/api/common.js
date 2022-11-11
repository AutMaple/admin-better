import Request from "@/utils/request";

export const getMenu = () => Request({
    url: "/common/menus",
    method: "get",
})