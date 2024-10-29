export const myData = ()=>{
    const shop = localStorage.getItem("shop");
    return shop ? JSON.parse(shop) : [];
}
