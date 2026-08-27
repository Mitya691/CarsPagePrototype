"use strict";

const icon = (name, className = "") => `<svg${className ? ` class="${className}"` : ""} aria-hidden="true"><use href="#i-${name}"></use></svg>`;

const statusMeta = {
  in_order: { label: "В заказе", tone: "green", available: true },
  on_line: { label: "На линии", tone: "purple", available: true },
  in_task: { label: "В задаче", tone: "orange", available: false },
  deactivated: { label: "В деактивации", tone: "red", available: false },
  repair: { label: "В ремонте", tone: "blue", available: false },
  excluded: { label: "Исключена", tone: "gray", available: false },
};

const initialVehicles = [
  { id:"car-001", plate:"А 213 ХА 797", make:"Changan", model:"UNI-V", trim:"UNI-V DLX 1.5T/181 7RT 5L", status:"in_order", statusHours:12.75, fuelKm:45, fuelPercent:55, city:"Москва", order:"476234e2", client:"Иванов Иван", promo:"Сбер", color:"Бирюзовый", tires:"Летние", project:"Ситидрайв", fuelType:"АИ 92", year:2023, company:"Новые городские технологии", online:true, offlineHours:0, battery:12.5, doorsOpen:false, hoodOpen:false, engineOn:false, mileage:12345, sim:78, telemetryId:"TM-739184", visibility:"Доступно" },
  { id:"car-002", plate:"Ф 241 МС 797", make:"Chery", model:"Tiggo 7 Pro", trim:"Elite 1.5T/147 CVT 5W", status:"on_line", statusHours:24.2, fuelKm:14, fuelPercent:88, city:"Москва", promo:"—", color:"Белый", tires:"Летние", project:"Ситидрайв", fuelType:"АИ 92", year:2022, company:"Новые городские технологии", online:true, offlineHours:0, battery:12.7, doorsOpen:false, hoodOpen:false, engineOn:false, mileage:34102, sim:5, telemetryId:"TM-192830", visibility:"Доступно" },
  { id:"car-003", plate:"М 918 РЕ 797", make:"Geely", model:"Coolray", trim:"FL Comfort 1.5T/147 7RT", status:"in_task", statusHours:1.2, fuelKm:45, fuelPercent:55, city:"Москва", task:"Срочная мойка", executor:"Перегонов Перегон", promo:"Сбер", color:"Серый", tires:"Летние", project:"Ситидрайв", fuelType:"АИ 92", year:2023, company:"Новые городские технологии", online:true, offlineHours:0, battery:12.4, doorsOpen:false, hoodOpen:false, engineOn:false, mileage:18450, sim:66, telemetryId:"TM-772941", visibility:"Скрыто" },
  { id:"car-004", plate:"К 662 ЕВ 198", make:"Geely", model:"Coolray", trim:"FL Comfort 1.5T/147 7RT", status:"deactivated", statusHours:24.2, fuelKm:8, fuelPercent:10, city:"Санкт-Петербург", deactivationType:"Гарантийный ремонт", promo:"Сбер", color:"Чёрный", tires:"Зимние", project:"Ситидрайв", fuelType:"АИ 92", year:2021, company:"Новые городские технологии", online:false, offlineHours:19, battery:11.8, doorsOpen:false, hoodOpen:false, engineOn:false, mileage:58720, sim:3, telemetryId:"TM-003871", visibility:"Скрыто" },
  { id:"car-005", plate:"Е 417 НА 198", make:"Haval", model:"Jolion", trim:"Elite 1.5T 7DCT 4WD", status:"repair", statusHours:228, fuelKm:126, fuelPercent:71, city:"Санкт-Петербург", repairType:"Гарантийный ремонт", executor:"Перегонов Перегон", promo:"Сбер", color:"Синий", tires:"Зимние", project:"Ситидрайв", fuelType:"АИ 95", year:2022, company:"Новые городские технологии", online:false, offlineHours:52, battery:12.1, doorsOpen:true, hoodOpen:true, engineOn:false, mileage:40691, sim:0, telemetryId:"TM-447102", visibility:"Скрыто" },
  { id:"car-006", plate:"Т 034 КК 799", make:"Changan", model:"UNI-K", trim:"Luxe 2.0T/226 8AT 4WD", status:"excluded", statusHours:1752, fuelKm:0, fuelPercent:0, city:"Москва", promo:"—", color:"Белый", tires:"Летние", project:"Ситидрайв", fuelType:"АИ 95", year:2021, company:"Флит менеджмент", online:false, offlineHours:168, battery:10.9, doorsOpen:false, hoodOpen:false, engineOn:false, mileage:91002, sim:0, telemetryId:"TM-620091", visibility:"Недоступно" },
  { id:"car-007", plate:"Р 578 ОХ 797", make:"Chery", model:"Tiggo 4 Pro", trim:"Style 1.5T CVT", status:"on_line", statusHours:7.5, fuelKm:87, fuelPercent:42, city:"Москва", promo:"VK", color:"Красный", tires:"Летние", project:"Ситидрайв", fuelType:"АИ 92", year:2024, company:"Новые городские технологии", online:true, offlineHours:0, battery:12.8, doorsOpen:false, hoodOpen:false, engineOn:true, mileage:8412, sim:91, telemetryId:"TM-821005", visibility:"Доступно" },
  { id:"car-008", plate:"В 901 АТ 196", make:"Geely", model:"Emgrand", trim:"Comfort 1.5 6AT", status:"deactivated", statusHours:14.4, fuelKm:22, fuelPercent:18, city:"Екатеринбург", deactivationType:"Потеря связи", promo:"Яндекс", color:"Серый", tires:"Зимние", project:"Урал", fuelType:"АИ 92", year:2022, company:"Регион авто", online:false, offlineHours:14.4, battery:11.9, doorsOpen:false, hoodOpen:false, engineOn:false, mileage:50291, sim:1, telemetryId:"TM-510492", visibility:"Скрыто" },
  { id:"car-009", plate:"С 115 МК 152", make:"Haval", model:"Jolion", trim:"Premium 1.5T 7DCT", status:"in_task", statusHours:18.1, fuelKm:210, fuelPercent:82, city:"Нижний Новгород", task:"Перегон в сервис", promo:"—", color:"Белый", tires:"Зимние", project:"Волга", fuelType:"АИ 95", year:2023, company:"Регион авто", online:true, offlineHours:0, battery:12.6, doorsOpen:false, hoodOpen:false, engineOn:false, mileage:22519, sim:57, telemetryId:"TM-441053", visibility:"Скрыто" },
  { id:"car-010", plate:"Н 752 ТР 123", make:"Changan", model:"CS35 Plus", trim:"Tech 1.4T 7DCT", status:"in_order", statusHours:.8, fuelKm:61, fuelPercent:37, city:"Краснодар", order:"75bb18a9", client:"Анна Петрова", promo:"Т-Банк", color:"Оранжевый", tires:"Летние", project:"Юг", fuelType:"АИ 95", year:2024, company:"Регион авто", online:true, offlineHours:0, battery:12.7, doorsOpen:false, hoodOpen:false, engineOn:true, mileage:4701, sim:83, telemetryId:"TM-712002", visibility:"Доступно" },
  { id:"car-011", plate:"О 403 РС 797", make:"Geely", model:"Coolray", trim:"Flagship 1.5T 7DCT", status:"on_line", statusHours:31.6, fuelKm:37, fuelPercent:24, city:"Москва", promo:"Сбер", color:"Фиолетовый", tires:"Летние", project:"Ситидрайв", fuelType:"АИ 92", year:2023, company:"Флит менеджмент", online:false, offlineHours:16, battery:11.7, doorsOpen:true, hoodOpen:false, engineOn:false, mileage:27690, sim:2, telemetryId:"TM-172056", visibility:"Доступно" },
  { id:"car-012", plate:"А 889 ЕК 198", make:"Chery", model:"Tiggo 7 Pro", trim:"Prestige 1.5T CVT", status:"repair", statusHours:73, fuelKm:95, fuelPercent:48, city:"Санкт-Петербург", repairType:"Кузовной ремонт", executor:"Сервис Север", promo:"—", color:"Чёрный", tires:"Зимние", project:"Север", fuelType:"АИ 95", year:2021, company:"Флит менеджмент", online:true, offlineHours:0, battery:12.3, doorsOpen:false, hoodOpen:true, engineOn:false, mileage:68140, sim:44, telemetryId:"TM-609103", visibility:"Скрыто" },
  { id:"car-013", plate:"М 220 СР 797", make:"Haval", model:"F7", trim:"Premium 2.0T 7DCT 4WD", status:"in_task", statusHours:22.5, fuelKm:72, fuelPercent:33, city:"Москва", task:"Диагностика телеметрии", promo:"VK", color:"Синий", tires:"Летние", project:"Ситидрайв", fuelType:"АИ 95", year:2022, company:"Новые городские технологии", online:false, offlineHours:21, battery:11.6, doorsOpen:false, hoodOpen:false, engineOn:false, mileage:37991, sim:1, telemetryId:"TM-339451", visibility:"Скрыто" },
  { id:"car-014", plate:"К 018 ВТ 196", make:"Changan", model:"UNI-V", trim:"Luxe 1.5T/181 7DCT", status:"on_line", statusHours:3.4, fuelKm:154, fuelPercent:69, city:"Екатеринбург", promo:"Яндекс", color:"Зелёный", tires:"Зимние", project:"Урал", fuelType:"АИ 95", year:2024, company:"Регион авто", online:true, offlineHours:0, battery:12.9, doorsOpen:false, hoodOpen:false, engineOn:false, mileage:6031, sim:95, telemetryId:"TM-882410", visibility:"Доступно" },
];

const cloneVehicles = () => initialVehicles.map((vehicle) => ({ ...vehicle }));
const makeFilter = (key, value, label) => ({ id:`${key}:${String(value)}`, key, value, label });

const filterCategories = [
  { key:"model", title:"Марка и модель", options:["Changan UNI-V","Changan UNI-K","Changan CS35 Plus","Chery Tiggo 7 Pro","Chery Tiggo 4 Pro","Geely Coolray","Geely Emgrand","Haval Jolion","Haval F7"].map(value => ({value,label:value})) },
  { key:"city", title:"Город", options:["Москва","Санкт-Петербург","Екатеринбург","Нижний Новгород","Краснодар"].map(value => ({value,label:value})) },
  { key:"status", title:"Статус", options:Object.entries(statusMeta).map(([value,meta]) => ({value,label:meta.label})) },
  { key:"time_gt", title:"Время в статусе", options:[{value:"3",label:"Больше 3 часов"},{value:"12",label:"Больше 12 часов"},{value:"24",label:"Больше суток"},{value:"48",label:"Больше 2 суток"},{value:"168",label:"Больше недели"}] },
  { key:"promo", title:"Оклейка", options:["Сбер","VK","Яндекс","Т-Банк","—"].map(value => ({value,label:value})) },
  { key:"color", title:"Цвет", options:["Белый","Чёрный","Серый","Синий","Красный","Зелёный","Бирюзовый"].map(value => ({value,label:value})) },
  { key:"tires", title:"Тип шин", options:["Летние","Зимние"].map(value => ({value,label:value})) },
  { key:"project", title:"Проект", options:["Ситидрайв","Север","Урал","Волга","Юг"].map(value => ({value,label:value})) },
  { key:"fuelType", title:"Вид топлива", options:["АИ 92","АИ 95"].map(value => ({value,label:value})) },
  { key:"year", title:"Год выпуска авто", options:[2021,2022,2023,2024].map(value => ({value:String(value),label:String(value)})) },
  { key:"company", title:"Компания владелец", options:["Новые городские технологии","Флит менеджмент","Регион авто"].map(value => ({value,label:value})) },
  { key:"online", title:"Связь", options:[{value:"true",label:"В сети"},{value:"false",label:"Не в сети"}] },
  { key:"fuel_lt", title:"Уровень топлива", options:[{value:"15",label:"Меньше 15%"},{value:"25",label:"Меньше 25%"},{value:"50",label:"Меньше 50%"}] },
  { key:"battery_lt", title:"Напряжение АКБ", options:[{value:"11.8",label:"Ниже 11,8 В"},{value:"12",label:"Ниже 12,0 В"},{value:"12.2",label:"Ниже 12,2 В"}] },
  { key:"doors", title:"Состояние дверей", options:[{value:"open",label:"Открыты"},{value:"closed",label:"Закрыты"}] },
];

const quickSelections = [
  { name:"Долго в деактивации", icon:"activity", filters:[makeFilter("status","deactivated","Статус: В деактивации"),makeFilter("time_gt",12,"В статусе: больше 12 ч")] },
  { name:"Долго в ремонте", icon:"wrench", filters:[makeFilter("status","repair","Статус: В ремонте"),makeFilter("time_gt",48,"В статусе: больше 2 суток")] },
  { name:"Долго в простое", icon:"clock", filters:[makeFilter("status","on_line","Статус: На линии"),makeFilter("time_gt",24,"В статусе: больше суток")] },
  { name:"Долго вне линии", icon:"wifi-off", filters:[makeFilter("online",false,"Связь: Не в сети"),makeFilter("offline_gt",12,"Не в сети: больше 12 ч")] },
  { name:"В задаче без исполнителя", icon:"user", filters:[makeFilter("status","in_task","Статус: В задаче"),makeFilter("executor","none","Исполнитель: Не назначен")] },
];

const navItems = [
  ["Автомобили","car",true],["Каталог","layers"],["Задачи","list"],["Исполнители","users"],["Телеметрия","code"],
  ["Конструктор задач","sliders"],["Окно модератора","eye"],["Ремонт","wrench"],["Экспорт / Импорт","download"],
];

const loadSaved = () => {
  try { return JSON.parse(localStorage.getItem("auto-prototype-selections") || "[]"); }
  catch { localStorage.removeItem("auto-prototype-selections"); return []; }
};

const state = {
  vehicles: cloneVehicles(), filters: [], scope: "all", view: "list", selectedId: null,
  searchOpen: false, activeCategory: null, draftValues: [], savedSelections: loadSaved(),
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const escapeHtml = (value) => String(value ?? "").replace(/[&<>'"]/g, character => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[character]));

function mergeFilters(current, incoming) {
  const keys = new Set(incoming.map(filter => filter.key));
  return [...current.filter(filter => !keys.has(filter.key)), ...incoming];
}

function formatDuration(hours) {
  if (hours >= 24) return `${Math.floor(hours / 24)} д ${Math.round(hours % 24)} ч`;
  const whole = Math.floor(hours);
  return `${whole} ч ${Math.round((hours - whole) * 60)} м`;
}

function pluralCars(value) {
  const mod10 = value % 10;
  const mod100 = value % 100;
  if (mod10 === 1 && mod100 !== 11) return `${value} автомобиль`;
  if ([2,3,4].includes(mod10) && ![12,13,14].includes(mod100)) return `${value} автомобиля`;
  return `${value} автомобилей`;
}

function matchesFilter(vehicle, filter) {
  const value = filter.value;
  switch (filter.key) {
    case "status": return vehicle.status === value;
    case "city": return vehicle.city === value;
    case "model": return `${vehicle.make} ${vehicle.model}` === value;
    case "time_gt": return vehicle.statusHours > Number(value);
    case "promo": return vehicle.promo === value;
    case "color": return vehicle.color === value;
    case "tires": return vehicle.tires === value;
    case "project": return vehicle.project === value;
    case "fuelType": return vehicle.fuelType === value;
    case "year": return vehicle.year === Number(value);
    case "company": return vehicle.company === value;
    case "online": return vehicle.online === value;
    case "offline_gt": return vehicle.offlineHours > Number(value);
    case "fuel_lt": return vehicle.fuelPercent < Number(value);
    case "battery_lt": return vehicle.battery < Number(value);
    case "doors": return vehicle.doorsOpen === (value === "open");
    case "hood": return vehicle.hoodOpen === (value === "open");
    case "executor": return value === "none" ? !vehicle.executor : vehicle.executor === value;
    case "text": {
      const source = [vehicle.plate,vehicle.make,vehicle.model,vehicle.trim,vehicle.city,vehicle.order,vehicle.client,vehicle.task,vehicle.executor,vehicle.telemetryId]
        .filter(Boolean).join(" ").toLocaleLowerCase("ru-RU").replaceAll(" ","");
      return source.includes(String(value).toLocaleLowerCase("ru-RU").replaceAll(" ",""));
    }
    default: return true;
  }
}

function filteredVehicles() {
  const grouped = new Map();
  state.filters.forEach(filter => grouped.set(filter.key,[...(grouped.get(filter.key)||[]),filter]));
  return state.vehicles.filter(vehicle => {
    const scopeMatch = state.scope === "all" || (state.scope === "available" && statusMeta[vehicle.status].available) || (state.scope === "unavailable" && !statusMeta[vehicle.status].available);
    return scopeMatch && [...grouped.values()].every(group => group.some(filter => matchesFilter(vehicle,filter)));
  });
}

function parseSmartQuery(query) {
  const normalized = query.toLocaleLowerCase("ru-RU").replaceAll("ё","е");
  const filters = [];
  const add = filter => { if (!filters.some(item => item.id === filter.id)) filters.push(filter); };
  [
    [/деактив/,"deactivated","В деактивации"],[/ремонт/,"repair","В ремонте"],[/задач/,"in_task","В задаче"],
    [/заказ/,"in_order","В заказе"],[/(на линии|свободн)/,"on_line","На линии"],[/исключ/,"excluded","Исключена"],
  ].forEach(([pattern,value,label]) => { if (pattern.test(normalized)) add(makeFilter("status",value,`Статус: ${label}`)); });
  filterCategories.find(category => category.key === "city").options.forEach(option => {
    if (normalized.includes(option.value.toLocaleLowerCase("ru-RU"))) add(makeFilter("city",option.value,`Город: ${option.label}`));
  });
  filterCategories.find(category => category.key === "model").options.forEach(option => {
    const [make,...model] = option.value.toLocaleLowerCase("ru-RU").split(" ");
    if (normalized.includes(make) || normalized.includes(model.join(" "))) add(makeFilter("model",option.value,`Марка и модель: ${option.label}`));
  });
  if (/(не в сети|офлайн|вне линии)/.test(normalized)) add(makeFilter("online",false,"Связь: Не в сети"));
  else if (/(в сети|онлайн)/.test(normalized)) add(makeFilter("online",true,"Связь: В сети"));
  if (/без исполнител/.test(normalized)) add(makeFilter("executor","none","Исполнитель: Не назначен"));
  if (/двер.{0,10}откры/.test(normalized)) add(makeFilter("doors","open","Двери: Открыты"));
  if (/капот.{0,10}откры/.test(normalized)) add(makeFilter("hood","open","Капот: Открыт"));
  const time = normalized.match(/(?:больше|дольше|старше|свыше)\s*(\d+)\s*(?:ч|час)/);
  if (time) {
    const hours = Number(time[1]);
    add(/(офлайн|не в сети|вне линии)/.test(normalized) ? makeFilter("offline_gt",hours,`Не в сети: больше ${hours} ч`) : makeFilter("time_gt",hours,`В статусе: больше ${hours} ч`));
  }
  const fuel = normalized.match(/(?:топлив|бензин).{0,20}(?:меньше|ниже|до)\s*(\d+)/);
  if (fuel) add(makeFilter("fuel_lt",Number(fuel[1]),`Топливо: меньше ${fuel[1]}%`));
  else if (/(мало топлива|низк.{0,8}топлив)/.test(normalized)) add(makeFilter("fuel_lt",25,"Топливо: меньше 25%"));
  const battery = normalized.match(/(?:акб|батаре).{0,20}(?:меньше|ниже|до)\s*(\d+[.,]?\d*)/);
  if (battery) {
    const voltage = Number(battery[1].replace(",","."));
    add(makeFilter("battery_lt",voltage,`АКБ: ниже ${voltage} В`));
  } else if (/(низк.{0,8}акб|разряжен)/.test(normalized)) add(makeFilter("battery_lt",12.2,"АКБ: ниже 12,2 В"));
  if (!filters.length && query.trim()) add(makeFilter("text",query.trim(),`Поиск: ${query.trim()}`));
  return filters;
}

function averageDuration(vehicles,status) {
  const matching = vehicles.filter(vehicle => vehicle.status === status);
  if (!matching.length) return "—";
  return formatDuration(matching.reduce((sum,vehicle) => sum + vehicle.statusHours,0) / matching.length);
}

function toast(message,type="success") {
  const node = document.createElement("div");
  node.className = `toast ${type}`;
  node.innerHTML = `${icon(type === "info" ? "sparkle" : "activity")}<span>${escapeHtml(message)}</span>`;
  $("#toast-region").append(node);
  window.setTimeout(() => { node.classList.add("leaving"); window.setTimeout(() => node.remove(),220); },2800);
}

function saveSelections() {
  localStorage.setItem("auto-prototype-selections",JSON.stringify(state.savedSelections));
}

function renderNav() {
  $("#main-nav").innerHTML = navItems.map(([label,iconName,active]) => `<button class="nav-item${active ? " active" : ""}" data-nav="${escapeHtml(label)}">${icon(iconName)}<span>${escapeHtml(label)}</span></button>`).join("");
}

function renderChips() {
  $("#active-chips").innerHTML = state.filters.map(filter => `<span class="filter-chip">${escapeHtml(filter.label)}<button data-remove-filter="${escapeHtml(filter.id)}" aria-label="Удалить фильтр">${icon("x")}</button></span>`).join("");
  const count = state.filters.length + (state.scope === "all" ? 0 : 1);
  $("#save-selection").disabled = count === 0;
  $("#save-selection").classList.toggle("enabled",count > 0);
  $("#reset-button").disabled = count === 0;
  $("#reset-button").textContent = count ? `Сбросить · ${count}` : "Сбросить";
  $("#clear-filters-link").classList.toggle("hidden",count === 0);
  $("#smart-search").placeholder = state.filters.length ? "Добавить условие…" : "Поиск — например: Geely в Москве, топлива меньше 25%";
}

function metric(label,value) { return `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`; }
function renderMetrics(vehicles) {
  const count = status => vehicles.filter(vehicle => vehicle.status === status).length;
  $("#metrics").innerHTML = `
    <article class="metric-card"><div class="metric-title"><span class="metric-icon green">${icon("car")}</span>Автомобили на линии</div><div class="metric-values two">${metric("В заказе",count("in_order"))}${metric("Свободно",count("on_line"))}</div></article>
    <article class="metric-card"><div class="metric-title"><span class="metric-icon red">${icon("bell")}</span>Недоступны</div><div class="metric-values three">${metric("В задаче",count("in_task"))}${metric("В деактивации",count("deactivated"))}${metric("В ремонте",count("repair"))}</div></article>
    <article class="metric-card"><div class="metric-title"><span class="metric-icon gray">${icon("layers")}</span>Статус автопарка</div><div class="metric-values two">${metric("Ср. время в деактивации",averageDuration(vehicles,"deactivated"))}${metric("Ср. время в задаче",averageDuration(vehicles,"in_task"))}</div></article>`;
}

function cardDetails(vehicle) {
  if (vehicle.status === "in_order") return [["Заказ",vehicle.order || "—",true],["Клиент",vehicle.client || "—",true]];
  if (vehicle.status === "in_task") return [["Задача",vehicle.task || "—",true],["Исполнитель",vehicle.executor || "Не назначен",Boolean(vehicle.executor)]];
  if (vehicle.status === "deactivated") return [["Тип деактивации",vehicle.deactivationType || "—",false],["Связь",vehicle.online ? "В сети" : "Не в сети",vehicle.online]];
  if (vehicle.status === "repair") return [["Тип ремонта",vehicle.repairType || "—",true],["Исполнитель",vehicle.executor || "Не назначен",Boolean(vehicle.executor)]];
  return [["Проект",vehicle.project,false],["Видимость",vehicle.visibility,false]];
}

function field(label,value,className="") { return `<div class="card-field"><span>${escapeHtml(label)}</span><div${className ? ` class="${className}"` : ""}>${value}</div></div>`; }
function renderVehicleCard(vehicle) {
  const meta = statusMeta[vehicle.status];
  const details = cardDetails(vehicle);
  return `<article class="vehicle-card${state.selectedId === vehicle.id ? " selected" : ""}" data-vehicle="${vehicle.id}" tabindex="0">
    <div class="vehicle-title"><strong>${escapeHtml(vehicle.plate)}</strong><button class="copy-button" data-copy="${escapeHtml(vehicle.plate)}" data-copy-label="Госномер" aria-label="Скопировать госномер">${icon("copy")}</button><span>${escapeHtml(`${vehicle.make} ${vehicle.model}`)}</span><span>${escapeHtml(vehicle.trim)}</span>${icon("chevron","card-chevron")}</div>
    <div class="vehicle-grid">
      ${field("Статус",`<span class="status-pill ${meta.tone}">${escapeHtml(meta.label)}</span>`)}
      ${field("Время в статусе",`<span class="${vehicle.statusHours > 12 ? "attention" : ""}">${formatDuration(vehicle.statusHours)}</span>`)}
      ${field("Топливо",`${escapeHtml(vehicle.fuelType)} · <span class="${vehicle.fuelPercent < 20 ? "danger" : ""}">${vehicle.fuelKm} км (${vehicle.fuelPercent}%)</span>`)}
      ${field("Город",escapeHtml(vehicle.city))}
      ${field(details[0][0],escapeHtml(details[0][1]),details[0][2] ? "link-value" : "")}
      ${field(details[1][0],escapeHtml(details[1][1]),details[1][2] ? "link-value" : "")}
      ${field("Промо-оклейка",escapeHtml(vehicle.promo))}
    </div>
  </article>`;
}

function renderMap(vehicles,downtime) {
  const pins = vehicles.map((vehicle,index) => {
    const left = 12 + ((index * 23) % 75);
    const top = 18 + ((index * 31) % 66);
    const intensity = Math.min(100,Math.round(vehicle.statusHours / 2));
    const tone = downtime ? (intensity > 60 ? "hot" : intensity > 20 ? "warm" : "cool") : statusMeta[vehicle.status].tone;
    return `<button class="map-pin${state.selectedId === vehicle.id ? " selected" : ""}" data-vehicle="${vehicle.id}" style="left:${left}%;top:${top}%"><span class="${tone}">${icon("car")}</span><small>${escapeHtml(vehicle.plate)}</small></button>`;
  }).join("");
  return `<div class="fleet-map${downtime ? " downtime" : ""}"><div class="map-label">${icon("map")}<div><strong>${downtime ? "Карта простоев" : "Автомобили на карте"}</strong><span>${pluralCars(vehicles.length)} в текущей выборке</span></div></div><div class="road horizontal one"></div><div class="road horizontal two"></div><div class="road vertical one"></div><div class="road vertical two"></div>${pins}${!vehicles.length ? '<div class="empty-state">Нет автомобилей для отображения</div>' : ""}${downtime ? '<div class="map-legend"><span><i class="cool"></i>до 12 ч</span><span><i class="warm"></i>12–48 ч</span><span><i class="hot"></i>более 48 ч</span></div>' : ""}</div>`;
}

function renderContent(vehicles) {
  $("#results-title").textContent = pluralCars(vehicles.length);
  if (state.view === "list") {
    $("#content").innerHTML = vehicles.length ? `<div class="vehicle-list">${vehicles.map(renderVehicleCard).join("")}</div>` : `<div class="empty-state">${icon("search")}<h3>Автомобили не найдены</h3><p>Измените условия или сбросьте фильтры, чтобы вернуть весь автопарк.</p><button class="primary-button" data-action="reset">Сбросить фильтры</button></div>`;
  } else {
    $("#content").innerHTML = renderMap(vehicles,state.view === "downtime");
  }
}

function renderAll() {
  const vehicles = filteredVehicles();
  renderChips();
  renderMetrics(vehicles);
  renderContent(vehicles);
  $$(".view-tabs button").forEach(button => button.classList.toggle("active",button.dataset.view === state.view));
  $("#scope-select").value = state.scope;
  if (state.selectedId) renderDrawer();
}

function optionToFilter(category,option) {
  let value = option.value;
  if (["time_gt","fuel_lt","battery_lt","year"].includes(category.key)) value = Number(value);
  if (category.key === "online") value = value === "true";
  return makeFilter(category.key,value,`${category.title}: ${option.label}`);
}

function renderSearchPopover() {
  const popover = $("#search-popover");
  if (!state.searchOpen) { popover.classList.add("hidden"); $("#search-field").classList.remove("focused"); return; }
  popover.classList.remove("hidden");
  $("#search-field").classList.add("focused");
  const query = $("#smart-search").value.trim();
  if (state.activeCategory) {
    const category = state.activeCategory;
    popover.classList.add("narrow");
    popover.innerHTML = `<div class="category-panel"><button class="category-back" data-search-action="back">${icon("back")}Все фильтры</button><div class="category-heading"><span>${escapeHtml(category.title)}</span>${state.draftValues.length ? `<small>Выбрано: ${state.draftValues.length}</small>` : ""}</div><div class="option-list">${category.options.map(option => `<label class="option-row"><input type="checkbox" data-draft-value="${escapeHtml(option.value)}"${state.draftValues.includes(option.value) ? " checked" : ""}><span>${escapeHtml(option.label)}</span></label>`).join("")}</div><div class="category-footer"><button class="secondary-button" data-search-action="clear-draft">Очистить</button><button class="primary-button" data-search-action="apply-category">Применить</button></div></div>`;
    return;
  }
  popover.classList.remove("narrow");
  const saved = state.savedSelections.length ? `<div class="saved-list"><p class="section-label" style="margin:14px 0 7px">Сохранённые</p>${state.savedSelections.map(selection => `<div class="saved-row"><button data-saved-apply="${selection.id}">${icon("star")}<span>${escapeHtml(selection.name)}</span><small>${selection.filters.length} фильтр.</small></button><button class="delete-saved" data-saved-delete="${selection.id}" aria-label="Удалить выборку">${icon("trash")}</button></div>`).join("")}</div>` : "";
  popover.innerHTML = `${query ? `<button class="run-query" data-search-action="run-query">${icon("sparkle")}<span>Применить запрос <strong>«${escapeHtml(query)}»</strong><small>Enter</small></span></button>` : ""}<div class="popover-section"><p class="section-label">Быстрые выборки</p><div class="quick-grid">${quickSelections.map((selection,index) => `<button class="quick-choice" data-quick="${index}">${icon(selection.icon)}${escapeHtml(selection.name)}${icon("chevron","end-icon")}</button>`).join("")}</div>${saved}</div><div class="popover-section"><p class="section-label">Фильтры</p><div class="category-list">${filterCategories.map((category,index) => `<button data-category="${index}"><span>${escapeHtml(category.title)}</span>${icon("chevron")}</button>`).join("")}</div></div>`;
}

function openSearch() { state.searchOpen = true; renderSearchPopover(); }
function closeSearch() { state.searchOpen = false; state.activeCategory = null; renderSearchPopover(); }
function applyFilters(filters) {
  state.filters = mergeFilters(state.filters,filters);
  $("#smart-search").value = "";
  $("#clear-query").classList.add("hidden");
  closeSearch(); renderAll(); toast(`Применено фильтров: ${filters.length}`);
}
function resetFilters() { state.filters = []; state.scope = "all"; $("#smart-search").value = ""; $("#clear-query").classList.add("hidden"); closeSearch(); renderAll(); toast("Фильтры сброшены","info"); }

function telemetry(iconName,label,value,tone="") { return `<div class="telemetry-item"><span class="telemetry-icon ${tone}">${icon(iconName)}</span><div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div></div>`; }
function infoRow(label,value,accent=false) { return `<div class="info-row"><span>${escapeHtml(label)}</span><strong${accent ? ' class="accent"' : ""}>${escapeHtml(value)}</strong></div>`; }

function renderDrawer() {
  const vehicle = state.vehicles.find(item => item.id === state.selectedId);
  if (!vehicle) return closeDrawer();
  const meta = statusMeta[vehicle.status];
  $("#vehicle-drawer").innerHTML = `<button class="drawer-close" data-drawer-action="close" aria-label="Закрыть">${icon("x")}</button><div class="drawer-scroll">
    <header class="panel-header"><h2 class="panel-title">${escapeHtml(`${vehicle.make} ${vehicle.model}`)}${icon("chevron")}</h2><div><span class="status-pill ${meta.tone}">${escapeHtml(meta.label)} · ${formatDuration(vehicle.statusHours)}</span></div></header>
    <div class="vehicle-hero"><div class="car-visual"><img src="/assets/car-reference.png" alt="${escapeHtml(`${vehicle.make} ${vehicle.model}`)}"></div><div class="identity-list"><button data-copy="${escapeHtml(vehicle.plate)}" data-copy-label="Госномер">${escapeHtml(vehicle.plate)}${icon("copy")}</button><button data-copy="${vehicle.id}" data-copy-label="ID авто">ID авто${icon("copy")}</button><button data-copy="${vehicle.telemetryId}" data-copy-label="ID телеметрии">ID телеметрии${icon("copy")}</button></div></div>
    <div class="panel-primary-actions"><button class="outline-button" data-drawer-action="create-task">${icon("clipboard")}Создать задачу</button><button class="outline-button" data-drawer-action="deactivate">${icon(vehicle.status === "deactivated" ? "activity" : "wifi-off")}${vehicle.status === "deactivated" ? "Вернуть на линию" : "Деактивировать"}</button></div>
    <div class="telemetry-grid">
      ${telemetry(vehicle.online ? "wifi" : "wifi-off","В сети",vehicle.online ? "Сейчас" : `${formatDuration(vehicle.offlineHours)} назад`,vehicle.online ? "green" : "red")}
      ${telemetry("eye","Видимость",vehicle.visibility)}${telemetry("gauge","Двигатель",vehicle.engineOn ? "Включен" : "Выключен",vehicle.engineOn ? "green" : "")}
      ${telemetry("battery","АКБ",`${vehicle.battery.toFixed(1).replace(".",",")} В`,vehicle.battery < 12.2 ? "red" : "")}
      ${telemetry(vehicle.doorsOpen ? "unlock" : "lock","Двери",vehicle.doorsOpen ? "Открыты" : "Закрыты",vehicle.doorsOpen ? "red" : "")}
      ${telemetry("wrench","Капот",vehicle.hoodOpen ? "Открыт" : "Закрыт",vehicle.hoodOpen ? "red" : "")}
      ${telemetry("gauge","Пробег",`${vehicle.mileage.toLocaleString("ru-RU")} км`)}${telemetry("fuel","Топливо",`${vehicle.fuelKm} км (${vehicle.fuelPercent}%)`,vehicle.fuelPercent < 20 ? "red" : "")}
      ${telemetry("signal","GSM SIM 1",`${vehicle.sim}%`,vehicle.sim < 10 ? "red" : "")}
    </div>
    <section class="panel-section"><h3>Действия</h3><div class="action-grid"><button class="outline-button" data-drawer-action="open-doors">${icon("unlock")}Открыть двери</button><button class="outline-button" data-drawer-action="close-doors">${icon("lock")}Закрыть двери</button><button class="outline-button" data-drawer-action="horn">${icon("bell")}Подать сигнал</button><button class="outline-button" data-drawer-action="toggle-hood">${icon("wrench")}${vehicle.hoodOpen ? "Закрыть капот" : "Открыть капот"}</button></div></section>
    <section class="panel-section"><h3>Общая информация</h3>${infoRow("В заказе",vehicle.order || "—",Boolean(vehicle.order))}${infoRow("Клиент",vehicle.client || "—",Boolean(vehicle.client))}${infoRow("Статус аренды",vehicle.status === "in_order" ? "usage" : "—")}${infoRow("Местоположение",vehicle.city)}${infoRow("Класс авто","Комфорт")}${infoRow("Тип топлива",vehicle.fuelType.replace("АИ ",""))}${infoRow("Деактивация",vehicle.deactivationType || "—")}${infoRow("Проект",vehicle.project)}${infoRow("Компания",vehicle.company)}</section>
    <section class="panel-section"><h3>Тариф</h3>${infoRow("Пакетный тариф","—")}${infoRow("Использование","15,60 ₽")}${infoRow("Ожидание","5,20 ₽")}</section>
  </div>`;
  $("#vehicle-drawer").classList.add("open");
  $("#vehicle-drawer").setAttribute("aria-hidden","false");
  $("#drawer-overlay").classList.remove("hidden");
}

function openDrawer(id) { state.selectedId = id; renderAll(); renderDrawer(); }
function closeDrawer() { state.selectedId = null; $("#vehicle-drawer").classList.remove("open"); $("#vehicle-drawer").setAttribute("aria-hidden","true"); $("#drawer-overlay").classList.add("hidden"); renderContent(filteredVehicles()); }
function updateVehicle(patch,message) {
  state.vehicles = state.vehicles.map(vehicle => vehicle.id === state.selectedId ? {...vehicle,...patch} : vehicle);
  renderAll(); toast(message);
}

async function copyValue(value,label) {
  try { await navigator.clipboard.writeText(value); }
  catch {
    const input = document.createElement("textarea"); input.value = value; document.body.append(input); input.select(); document.execCommand("copy"); input.remove();
  }
  toast(`${label} скопирован`);
}

function openSaveModal() {
  if (!state.filters.length && state.scope === "all") return;
  $("#save-filter-summary").innerHTML = [...state.filters.map(filter => `<span>${escapeHtml(filter.label)}</span>`),...(state.scope === "all" ? [] : [`<span>${state.scope === "available" ? "Только доступные" : "Только недоступные"}</span>`])].join("");
  $("#selection-name").value = ""; $("#confirm-save").disabled = true; $("#save-modal").classList.remove("hidden"); window.setTimeout(() => $("#selection-name").focus(),0);
}
function closeSaveModal() { $("#save-modal").classList.add("hidden"); }
function confirmSave() {
  const name = $("#selection-name").value.trim();
  if (!name) return;
  state.savedSelections = [...state.savedSelections.filter(selection => selection.name !== name),{id:globalThis.crypto?.randomUUID?.() || String(Date.now()),name,filters:state.filters.map(filter => ({...filter})),scope:state.scope,createdAt:Date.now()}];
  saveSelections(); closeSaveModal(); toast(`Выборка «${name}» сохранена`);
}

function exportCsv() {
  const rows = [["Госномер","Марка","Модель","Статус","Город","Топливо, %","АКБ, В"],...filteredVehicles().map(vehicle => [vehicle.plate,vehicle.make,vehicle.model,statusMeta[vehicle.status].label,vehicle.city,vehicle.fuelPercent,vehicle.battery])];
  const csv = "\ufeff" + rows.map(row => row.map(value => `"${String(value).replaceAll('"','""')}"`).join(";")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));
  const link = document.createElement("a"); link.href = url; link.download = "автомобили.csv"; link.click(); URL.revokeObjectURL(url); toast("Список экспортирован в CSV");
}

function runSmartSearch() {
  const query = $("#smart-search").value.trim();
  if (!query) return;
  applyFilters(parseSmartQuery(query));
}

document.addEventListener("click", event => {
  const target = event.target;
  const nav = target.closest("[data-nav]");
  if (nav) { toast(nav.dataset.nav === "Автомобили" ? "Вы уже в разделе «Автомобили»" : `Раздел «${nav.dataset.nav}» не входит в тестовый сценарий`,"info"); return; }
  const copy = target.closest("[data-copy]");
  if (copy) { event.stopPropagation(); copyValue(copy.dataset.copy,copy.dataset.copyLabel || "Значение"); return; }
  const removeFilter = target.closest("[data-remove-filter]");
  if (removeFilter) { state.filters = state.filters.filter(filter => filter.id !== removeFilter.dataset.removeFilter); renderAll(); return; }
  const view = target.closest("[data-view]");
  if (view) { state.view = view.dataset.view; renderAll(); return; }
  const vehicle = target.closest("[data-vehicle]");
  if (vehicle) { openDrawer(vehicle.dataset.vehicle); return; }
  const quick = target.closest("[data-quick]");
  if (quick) { applyFilters(quickSelections[Number(quick.dataset.quick)].filters); return; }
  const category = target.closest("[data-category]");
  if (category) {
    state.activeCategory = filterCategories[Number(category.dataset.category)];
    state.draftValues = state.filters.filter(filter => filter.key === state.activeCategory.key).map(filter => String(filter.value));
    renderSearchPopover(); return;
  }
  const savedApply = target.closest("[data-saved-apply]");
  if (savedApply) {
    const selection = state.savedSelections.find(item => item.id === savedApply.dataset.savedApply);
    if (selection) { state.filters = selection.filters.map(filter => ({...filter})); state.scope = selection.scope; closeSearch(); renderAll(); toast(`Выборка «${selection.name}» применена`); }
    return;
  }
  const savedDelete = target.closest("[data-saved-delete]");
  if (savedDelete) { state.savedSelections = state.savedSelections.filter(item => item.id !== savedDelete.dataset.savedDelete); saveSelections(); renderSearchPopover(); toast("Выборка удалена","info"); return; }
  const searchAction = target.closest("[data-search-action]")?.dataset.searchAction;
  if (searchAction === "run-query") return runSmartSearch();
  if (searchAction === "back") { state.activeCategory = null; renderSearchPopover(); return; }
  if (searchAction === "clear-draft") { state.draftValues = []; renderSearchPopover(); return; }
  if (searchAction === "apply-category") {
    const incoming = state.activeCategory.options.filter(option => state.draftValues.includes(option.value)).map(option => optionToFilter(state.activeCategory,option));
    state.filters = [...state.filters.filter(filter => filter.key !== state.activeCategory.key),...incoming]; closeSearch(); renderAll(); toast(incoming.length ? "Фильтр применён" : "Фильтр очищен"); return;
  }
  const drawerAction = target.closest("[data-drawer-action]")?.dataset.drawerAction;
  if (drawerAction) {
    const selected = state.vehicles.find(vehicle => vehicle.id === state.selectedId);
    if (!selected) return;
    if (drawerAction === "close") return closeDrawer();
    if (drawerAction === "create-task") return updateVehicle({status:"in_task",statusHours:0,task:"Новая задача",executor:undefined},`Задача для ${selected.plate} создана`);
    if (drawerAction === "deactivate") return selected.status === "deactivated" ? updateVehicle({status:"on_line",statusHours:0,deactivationType:undefined},`${selected.plate} возвращён на линию`) : updateVehicle({status:"deactivated",statusHours:0,deactivationType:"Ручная деактивация"},`${selected.plate} деактивирован`);
    if (drawerAction === "open-doors") return updateVehicle({doorsOpen:true},"Двери открыты");
    if (drawerAction === "close-doors") return updateVehicle({doorsOpen:false},"Двери закрыты");
    if (drawerAction === "horn") return toast(`Сигнал отправлен на ${selected.plate}`);
    if (drawerAction === "toggle-hood") return updateVehicle({hoodOpen:!selected.hoodOpen},selected.hoodOpen ? "Капот закрыт" : "Капот открыт");
  }
  const action = target.closest("[data-action]")?.dataset.action;
  if (action === "reset") return resetFilters();
  if (action === "settings") return toast("Настройки списка открыты","info");
  if (action === "profile") return toast("Открыт профиль тестового пользователя","info");
  if (action === "collapse-menu") { document.body.classList.toggle("menu-collapsed"); toast(document.body.classList.contains("menu-collapsed") ? "Меню свёрнуто" : "Меню развёрнуто","info"); return; }
  if (action === "refresh") { $("#more-menu").classList.add("hidden"); toast("Данные обновлены"); return; }
  if (action === "export") { $("#more-menu").classList.add("hidden"); exportCsv(); return; }
  if (action === "columns") { $("#more-menu").classList.add("hidden"); toast("Настройки колонок применены","info"); return; }
  if (action === "close-save-modal") return closeSaveModal();
  if (!target.closest("#search-composer")) closeSearch();
  if (!target.closest(".more-wrap")) $("#more-menu").classList.add("hidden");
});

document.addEventListener("change", event => {
  if (event.target.matches("[data-draft-value]")) {
    const value = event.target.dataset.draftValue;
    state.draftValues = event.target.checked ? [...new Set([...state.draftValues,value])] : state.draftValues.filter(item => item !== value);
    renderSearchPopover();
  }
});

$("#scope-select").addEventListener("change", event => { state.scope = event.target.value; renderAll(); });
$("#smart-search").addEventListener("focus", openSearch);
$("#smart-search").addEventListener("input", event => { $("#clear-query").classList.toggle("hidden",!event.target.value); state.searchOpen = true; renderSearchPopover(); });
$("#smart-search").addEventListener("keydown", event => { if (event.key === "Enter") runSmartSearch(); if (event.key === "Escape") closeSearch(); });
$("#clear-query").addEventListener("click", () => { $("#smart-search").value = ""; $("#clear-query").classList.add("hidden"); $("#smart-search").focus(); renderSearchPopover(); });
$("#more-button").addEventListener("click", () => $("#more-menu").classList.toggle("hidden"));
$("#save-selection").addEventListener("click", openSaveModal);
$("#reset-button").addEventListener("click", resetFilters);
$("#clear-filters-link").addEventListener("click", resetFilters);
$("#drawer-overlay").addEventListener("click", closeDrawer);
$("#selection-name").addEventListener("input", event => { $("#confirm-save").disabled = !event.target.value.trim(); });
$("#selection-name").addEventListener("keydown", event => { if (event.key === "Enter" && event.target.value.trim()) confirmSave(); });
$("#confirm-save").addEventListener("click", confirmSave);
$("#save-modal").addEventListener("click", event => { if (event.target.id === "save-modal") closeSaveModal(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") { if (!$("#save-modal").classList.contains("hidden")) closeSaveModal(); else if (state.selectedId) closeDrawer(); else closeSearch(); } });

renderNav();
renderAll();
