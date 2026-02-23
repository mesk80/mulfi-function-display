
/*اضافه کردن قطب ها
DME
کورس و بیرینگ
محاسبه زمان رسیدن به مقصد
ساطلاعات فرودگاه ها
کد مورس-
*/
import { DUB_SHI, TEH_LON, TEH_RSH, TEH_DUB, TEH_CLN, MIA_DUB, MSH_DUB, TEH_KSH} from '/routes.js'
var my_path = TEH_KSH;
// Initialize the map
var googleTileLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    //attribution: 'Map data &copy; <a href="https://www.google.com/maps">Google Maps</a>'
});
var googleNolabel = L.tileLayer('https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    //attribution: 'Map data &copy; <a href="https://www.google.com/maps">Google Maps</a>'
});
var openStreetMapTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    //attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
var openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    //attribution: 'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)'
});

var weatherTileLayer = L.tileLayer('https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid={dd6283c95d42172e9af9dfa8f22f0ff0}', {
    maxZoom: 19,
    attribution: 'Weather data © OpenWeatherMap'
});

// Function to switch tile layer
// ..............................

// initialize Iran's WayPoints
var waypoints_coord = [ {'Lat': 30.751944444444444, 'Long': 56.971944444444446, 'name': 'ALGUV'} ,{'Lat': 30.15, 'Long': 57.527499999999996, 'name': 'ALKES'} , {'Lat': 36.78388888888889, 'Long': 51.06916666666667, 'name': 'ALKOR'} ,{'Lat': 29.83361111111111, 'Long': 57.276944444444446, 'name': 'ALKUL'} ,{'Lat': 29.759444444444444, 'Long': 56.863055555555555, 'name': 'ALMEK'} ,{'Lat': 30.168055555555558, 'Long': 56.39083333333333, 'name': 'ALMIG'} ,{'Lat': 30.547500000000003, 'Long': 56.49333333333333, 'name': 'ALMOB'} ,{'Lat': 33.33361111111111, 'Long': 56.000277777777775, 'name': 'ALMUD'} ,{'Lat': 36.46, 'Long': 60.85583333333334, 'name': 'ALMUX'} ,{'Lat': 32.853611111111114, 'Long': 53.96277777777778, 'name': 'ALNER'} ,{'Lat': 28.678611111111113, 'Long': 50.02722222222222, 'name': 'ALNIN'} ,{'Lat': 37.0075, 'Long': 54.785555555555554, 'name': 'ALNIT'} ,{'Lat': 26.681944444444447, 'Long': 53.6325, 'name': 'ALNOL'} ,{'Lat': 32.14722222222222, 'Long': 49.39833333333333, 'name': 'ALTAX'} ,{'Lat': 36.69098611111111, 'Long': 50.058375, 'name': 'ALTIV'} ,{'Lat': 35.187777777777775, 'Long': 55.69333333333333, 'name': 'AMBEG'} ,{'Lat': 38.013888888888886, 'Long': 48.79555555555555, 'name': 'ASMOB'} ,{'Lat': 30.648333333333333, 'Long': 52.163333333333334, 'name': 'ASNIN'} ,{'Lat': 36.95888888888889, 'Long': 48.761944444444445, 'name': 'ASPOK'} ,{'Lat': 34.47027777777778, 'Long': 47.75361111111111, 'name': 'ASRIL'} ,{'Lat': 33.77583333333333, 'Long': 59.30777777777777, 'name': 'ASVIS'} ,{'Lat': 32.32805555555556, 'Long': 54.58277777777778, 'name': 'BOMIT'} ,{'Lat': 31.610277777777778, 'Long': 54.763888888888886, 'name': 'BOMUN'} ,{'Lat': 31.473888888888887, 'Long': 53.97083333333334, 'name': 'BONEG'} ,{'Lat': 32.37888888888889, 'Long': 54.12277777777778, 'name': 'BONOL'} ,{'Lat': 36.71638888888889, 'Long': 54.7075, 'name': 'BONUK'} ,{'Lat': 36.59777777777778, 'Long': 50.51138888888889, 'name': 'BONUP'} ,{'Lat': 30.736944444444447, 'Long': 58.82472222222223, 'name': 'BOPAG'} ,{'Lat': 33.32027777777778, 'Long': 59.24666666666667, 'name': 'BOPEB'} ,{'Lat': 30.478055555555553, 'Long': 48.71333333333334, 'name': 'BOPIS'} ,{'Lat': 38.47361111111111, 'Long': 45.35194444444445, 'name': 'BORES'} ,{'Lat': 26.723611111111108, 'Long': 55.719722222222224, 'name': 'BOSOS'} ,{'Lat': 36.793055555555554, 'Long': 58.62166666666667, 'name': 'BOTEK'} ,{'Lat': 34.63027777777778, 'Long': 51.863055555555555, 'name': 'BOXAM'},
{'Lat': 33.988083333333336, 'Long': 47.60350277777778, 'name': 'BUBAV'} ,{'Lat': 37.886944444444445, 'Long': 47.342222222222226, 'name': 'BUDED'} ,{'Lat': 37.08444444444444, 'Long': 54.748333333333335, 'name': 'DABSU'} ,{'Lat': 37.43861111111111, 'Long': 47.755833333333335, 'name': 'DAMOS'} ,{'Lat': 36.32916666666667, 'Long': 51.404444444444444, 'name': 'DANEB'} ,{'Lat': 29.118333333333332, 'Long': 61.28805555555555, 'name': 'DANIB'} ,{'Lat': 36.64055555555556, 'Long': 57.77972222222222, 'name': 'DANIC'} ,{'Lat': 28.9875, 'Long': 60.861111111111114, 'name': 'DANIX'} ,{'Lat': 29.245555555555555, 'Long': 60.399166666666666, 'name': 'DANOV'} ,{'Lat': 29.60388888888889, 'Long': 60.34277777777778, 'name': 'DANUS'} ,{'Lat': 29.775, 'Long': 60.431666666666665, 'name': 'DAPAP'} ,{'Lat': 32.85722222222223, 'Long': 48.69972222222222, 'name': 'DAPEM'} ,{'Lat': 25.75611111111111, 'Long': 54.95861111111111, 'name': 'DAPER'} ,{'Lat': 32.931666666666665, 'Long': 48.43138888888889, 'name': 'DAPIK'} ,{'Lat': 33.62888888888889, 'Long': 52.39194444444444, 'name': 'DAPOG'} ,{'Lat': 30.545833333333334, 'Long': 55.79111111111111, 'name': 'DAPOX'} ,
    {'Lat': 32.16222222222222, 'Long': 48.87888888888889, 'name': 'DARON'} ,
    {'Lat': 38.69305555555555, 'Long': 46.870555555555555, 'name': 'DASDA'} ,
    {'Lat': 28.855, 'Long': 52.06305555555555, 'name': 'DASDO'} ,
    {'Lat': 36.78805555555555, 'Long': 53.785, 'name': 'DATOL'} ,
    {'Lat': 26.561666666666667, 'Long': 53.56194444444444, 'name': 'DATUT'} ,
    {'Lat': 34.859722222222224, 'Long': 49.58166666666667, 'name': 'DAXAL'} ,
    {'Lat': 36.93888888888888, 'Long': 50.01222222222222, 'name': 'DEDLA'} ,
    {'Lat': 34.362500000000004, 'Long': 50.14222222222222, 'name': 'DEKBA'} ,
    {'Lat': 30.297777777777778, 'Long': 48.723888888888894, 'name': 'DEMPO'} ,
    {'Lat': 26.532777777777778, 'Long': 54.48888888888889, 'name': 'DENSI'} ,
    {'Lat': 29.428333333333335, 'Long': 61.28361111111111, 'name': 'DERBO'} ,
    {'Lat': 34.28583333333333, 'Long': 52.046388888888885, 'name': 'DIRUS'} ,
    {'Lat': 33.48444444444444, 'Long': 51.02166666666667, 'name': 'DISEL'} ,
    {'Lat': 25.178333333333335, 'Long': 59.86833333333333, 'name': 'DIVAB'} ,
    {'Lat': 34.286944444444444, 'Long': 51.54861111111111, 'name': 'DOBAS'} ,
    {'Lat': 31.04888888888889, 'Long': 53.66111111111111, 'name': 'DODAK'} ,
    {'Lat': 37.835, 'Long': 58.03333333333333, 'name': 'DOLOS'} ,
    {'Lat': 38.94908888888889, 'Long': 45.631594444444445, 'name': 'DULAV'} ,
    {'Lat': 35.91916666666666, 'Long': 51.81861111111112, 'name': 'DUNBA'} ,
    {'Lat': 27.205277777777777, 'Long': 52.028888888888886, 'name': 'DURSI'} ,
    {'Lat': 25.941388888888888, 'Long': 60.50388888888889, 'name': 'EGLES'} ,
    {'Lat': 37.05305555555555, 'Long': 50.3075, 'name': 'EGMAN'} ,
    {'Lat': 26.604166666666668, 'Long': 53.066944444444445, 'name': 'EGMID'} ,
    {'Lat': 25.66861111111111, 'Long': 59.925555555555555, 'name': 'EGNUX'} ,
    {'Lat': 32.55833333333333, 'Long': 51.402499999999996, 'name': 'EGPAT'} ,
    {'Lat': 25.871111111111112, 'Long': 60.12861111111111, 'name': 'EGPER'} ,
    {'Lat': 25.143055555555556, 'Long': 60.4925, 'name': 'EGPIC'} ,
    {'Lat': 25.078888888888887, 'Long': 61.545833333333334, 'name': 'EGRON'} ,
    {'Lat': 37.08916666666667, 'Long': 49.0625, 'name': 'EGRUD'} ,
    {'Lat': 34.58972222222222, 'Long': 51.75361111111111, 'name': 'EGTOS'} ,
    {'Lat': 37.40138888888889, 'Long': 56.81166666666666, 'name': 'EGTUL'} ,
    {'Lat': 31.72694444444444, 'Long': 49.13388888888889, 'name': 'EGVAX'} ,
    {'Lat': 34.71611111111111, 'Long': 50.50138888888889, 'name': 'EGVEL'} ,
    {'Lat': 38.27972222222222, 'Long': 47.905833333333334, 'name': 'EGVON'} ,
    {'Lat': 31.346666666666664, 'Long': 60.01083333333333, 'name': 'ELOKA'} ,
    {'Lat': 32.83027777777778, 'Long': 53.42805555555555, 'name': 'GABGU'} ,
    {'Lat': 37.6875, 'Long': 49.18111111111111, 'name': 'GABMI'} ,
    {'Lat': 30.90722222222222, 'Long': 48.976111111111116, 'name': 'GABMO'} ,
    {'Lat': 30.88888888888889, 'Long': 48.50472222222222, 'name': 'GABSU'} ,
    {'Lat': 32.27916666666667, 'Long': 50.782222222222224, 'name': 'GADLU'} ,
    {'Lat': 31.4525, 'Long': 54.550555555555555, 'name': 'GADPU'} ,
    {'Lat': 36.06638888888889, 'Long': 56.96555555555556, 'name': 'GAGDA'} ,
    {'Lat': 38.3425, 'Long': 46.91583333333333, 'name': 'GAGDI'} ,
    {'Lat': 31.765555555555554, 'Long': 52.06638888888889, 'name': 'GESIP'} ,
    {'Lat': 37.2075, 'Long': 46.85805555555556, 'name': 'GETOB'} ,
    {'Lat': 33.237500000000004, 'Long': 56.921388888888885, 'name': 'GEVOR'} ,
    {'Lat': 35.61638888888889, 'Long': 54.515277777777776, 'name': 'GIBAB'} ,
    {'Lat': 26.928333333333335, 'Long': 60.669999999999995, 'name': 'GOKSO'} ,
    {'Lat': 36.09916666666667, 'Long': 48.678888888888885, 'name': 'GOMVA'} ,
    {'Lat': 36.21555555555556, 'Long': 50.623333333333335, 'name': 'GOPDA'} ,
    {'Lat': 36.659166666666664, 'Long': 51.88333333333333, 'name': 'IBKER'} ,
    {'Lat': 29.4375, 'Long': 49.99777777777778, 'name': 'IBKUG'} ,
    {'Lat': 26.27138888888889, 'Long': 54.202222222222225, 'name': 'IBNUX'} ,
    {'Lat': 36.38111111111111, 'Long': 55.78944444444444, 'name': 'IBRAV'} ,
    {'Lat': 30.110000000000003, 'Long': 48.735, 'name': 'IBSAL'} ,
    {'Lat': 28.783611111111114, 'Long': 50.32638888888889, 'name': 'IBTOS'} ,
    {'Lat': 27.683333333333334, 'Long': 51.18333333333333, 'name': 'IMDAT'} ,
    {'Lat': 31.735277777777778, 'Long': 49.60305555555556, 'name': 'IMKEN'} ,
    {'Lat': 32.41416666666667, 'Long': 58.14888888888889, 'name': 'IMPAT'} ,
    {'Lat': 31.580833333333334, 'Long': 49.275277777777774, 'name': 'ITIBI'} ,
    {'Lat': 38.57666666666667, 'Long': 48.038888888888884, 'name': 'ITUPA'} ,
    {'Lat': 34.583333333333336, 'Long': 48.595, 'name': 'IVELI'} ,
    {'Lat': 32.65, 'Long': 60.733333333333334, 'name': 'KAMAR'} ,
    {'Lat': 25.264444444444443, 'Long': 57.78333333333333, 'name': 'KANAS'} ,
    {'Lat': 30.53527777777778, 'Long': 53.29194444444444, 'name': 'KANAT'} ,
    {'Lat': 29.03805555555556, 'Long': 50.015, 'name': 'KAPIP'} ,
    {'Lat': 28.71972222222222, 'Long': 53.53805555555555, 'name': 'KARAM'} ,
    {'Lat': 28.529722222222222, 'Long': 53.259166666666665, 'name': 'KASOL'} ,
    {'Lat': 28.39611111111111, 'Long': 52.311388888888885, 'name': 'KATAG'} ,
    {'Lat': 28.569166666666668, 'Long': 51.84638888888889, 'name': 'KATIB'} ,
    {'Lat': 28.944166666666668, 'Long': 51.44138888888889, 'name': 'KATOS'} ,
    {'Lat': 29.805555555555557, 'Long': 51.28444444444444, 'name': 'KAVIL'} ,
    {'Lat': 30.68638888888889, 'Long': 52.32277777777778, 'name': 'KAVOT'} ,
    {'Lat': 27.597777777777775, 'Long': 62.84, 'name': 'KEBUD'} ,
    {'Lat': 30.305555555555557, 'Long': 51.574444444444445, 'name': 'KISED'} ,
    {'Lat': 37.10416666666667, 'Long': 50.178888888888885, 'name': 'KOBUB'} ,
    {'Lat': 29.129722222222224, 'Long': 51.33888888888889, 'name': 'KUGVU'} ,
    {'Lat': 25.666666666666668, 'Long': 55.25416666666667, 'name': 'KUMUN'} ,
    {'Lat': 28.404999999999998, 'Long': 52.90888888888889, 'name': 'KUPTO'} ,
    {'Lat': 35.374722222222225, 'Long': 49.513888888888886, 'name': 'KUSLA'} ,
    {'Lat': 31.509444444444444, 'Long': 58.95305555555556, 'name': 'KUVAV'} ,
    {'Lat': 36.16611111111111, 'Long': 53.025277777777774, 'name': 'LABET'} ,
    {'Lat': 36.69499999999999, 'Long': 50.72833333333333, 'name': 'LABKA'} ,
    {'Lat': 32.81083333333333, 'Long': 53.014722222222225, 'name': 'LABOT'} ,
    {'Lat': 32.37388888888889, 'Long': 52.92861111111111, 'name': 'LADAL'} ,
    {'Lat': 26.891944444444444, 'Long': 59.42055555555555, 'name': 'LADAP'} ,
    {'Lat': 28.494722222222222, 'Long': 52.33527777777778, 'name': 'LAGSA'} ,
    {'Lat': 32.98444444444444, 'Long': 50.67472222222222, 'name': 'LAKMA'} ,
    {'Lat': 38.26990833333333, 'Long': 49.75309166666667, 'name': 'LALDA'} ,
    {'Lat': 33.6325, 'Long': 51.27055555555555, 'name': 'LALDU'} ,
    {'Lat': 33.737500000000004, 'Long': 51.64972222222222, 'name': 'LARAB'} ,
    {'Lat': 35.12777777777778, 'Long': 47.47805555555556, 'name': 'LOVID'} ,
    {'Lat': 31.748333333333335, 'Long': 51.72888888888889, 'name': 'LOXAK'} ,
    {'Lat': 26.45722222222222, 'Long': 56.02388888888889, 'name': 'LOXAM'} ,
    {'Lat': 27.765555555555554, 'Long': 60.760555555555555, 'name': 'LOXOL'} ,
    {'Lat': 36.611111111111114, 'Long': 48.82833333333333, 'name': 'LOXUB'} ,
    {'Lat': 29.949444444444445, 'Long': 60.683611111111105, 'name': 'LUDAX'} ,
    {'Lat': 26.77361111111111, 'Long': 57.38333333333333, 'name': 'MELMI'} ,
    {'Lat': 29.580277777777777, 'Long': 50.17444444444444, 'name': 'MEMPI'} ,
    {'Lat': 31.48888888888889, 'Long': 49.95027777777778, 'name': 'MESVI'} ,
    {'Lat': 24.932222222222222, 'Long': 61.471111111111114, 'name': 'METBI'} ,
    {'Lat': 36.198611111111106, 'Long': 58.411944444444444, 'name': 'METKI'} ,
    {'Lat': 37.09527777777778, 'Long': 59.02333333333333, 'name': 'MIDMO'} ,
    {'Lat': 36.455000000000005, 'Long': 55.11222222222222, 'name': 'MINOT'} ,
    {'Lat': 35.986111111111114, 'Long': 49.88972222222222, 'name': 'MIVAK'} ,
    {'Lat': 26.530833333333334, 'Long': 54.331388888888895, 'name': 'MIVUN'} ,
    {'Lat': 27.70722222222222, 'Long': 57.33583333333333, 'name': 'MOBAD'} ,
    {'Lat': 26.735, 'Long': 56.15222222222222, 'name': 'MOBET'} ,
    {'Lat': 27.737222222222222, 'Long': 55.42027777777778, 'name': 'MOBON'} ,
    {'Lat': 36.655, 'Long': 52.56861111111112, 'name': 'MODEK'} ,
    {'Lat': 37.82361111111111, 'Long': 49.68805555555555, 'name': 'MODIL'} ,
    {'Lat': 34.02027777777778, 'Long': 46.850833333333334, 'name': 'MOKAB'} ,
    {'Lat': 36.165277777777774, 'Long': 50.80444444444444, 'name': 'NABAX'} ,
    {'Lat': 28.275, 'Long': 58.433611111111105, 'name': 'NABOD'} ,
    {'Lat': 36.03722222222222, 'Long': 51.34861111111111, 'name': 'NAGMA'} ,
    {'Lat': 29.770555555555553, 'Long': 53.90472222222222, 'name': 'NALBI'} ,
    {'Lat': 28.688055555555557, 'Long': 56.657777777777774, 'name': 'NANTO'} ,
    {'Lat': 27.19806388888889, 'Long': 54.22624444444445, 'name': 'NEBIX'} ,
    {'Lat': 32.82194444444445, 'Long': 53.250277777777775, 'name': 'NIDIT'} ,
    {'Lat': 32.891666666666666, 'Long': 54.980555555555554, 'name': 'NODLA'} ,
    {'Lat': 33.29722222222222, 'Long': 49.04, 'name': 'NOTSA'} ,
    {'Lat': 35.23777777777778, 'Long': 59.50944444444445, 'name': 'NOTSO'} ,
    {'Lat': 28.970555555555553, 'Long': 49.669999999999995, 'name': 'OBMOR'} ,
    {'Lat': 31.37777777777778, 'Long': 51.87638888888889, 'name': 'OBTUX'} ,
    {'Lat': 32.513888888888886, 'Long': 59.43222222222222, 'name': 'ODBES'} ,
    {'Lat': 35.683055555555555, 'Long': 54.86138888888889, 'name': 'ODKAT'} ,
    {'Lat': 30.0775, 'Long': 57.925555555555555, 'name': 'ORDAD'} ,
    {'Lat': 34.91722222222222, 'Long': 49.155277777777776, 'name': 'ORLOG'} ,
    {'Lat': 37.7, 'Long': 58.575, 'name': 'ORPAB'} ,
    {'Lat': 26.075, 'Long': 53.958333333333336, 'name': 'ORSAR'} ,
    {'Lat': 26.666666666666668, 'Long': 54.45, 'name': 'PAPAR'} ,
    {'Lat': 38.744166666666665, 'Long': 46.35138888888889, 'name': 'PAPOK'} ,
    {'Lat': 34.140277777777776, 'Long': 57.39277777777778, 'name': 'PAPON'} ,
    {'Lat': 36.191111111111105, 'Long': 49.97805555555556, 'name': 'PAROT'} ,
    {'Lat': 32.78444444444444, 'Long': 52.49638888888889, 'name': 'PARUG'} ,
    {'Lat': 35.44416666666666, 'Long': 49.88361111111111, 'name': 'PAVET'} ,
    {'Lat': 33.348888888888894, 'Long': 46.08861111111111, 'name': 'PAXAT'} ,
    {'Lat': 36.284166666666664, 'Long': 50.33916666666667, 'name': 'PAXID'} ,
    {'Lat': 28.99138888888889, 'Long': 59.8725, 'name': 'PEKES'} ,
    {'Lat': 29.56861111111111, 'Long': 61.13583333333333, 'name': 'PIRAN'} ,
    {'Lat': 36.589444444444446, 'Long': 53.80472222222222, 'name': 'PUSAL'} ,
    {'Lat': 37.8, 'Long': 51.96, 'name': 'PUTMA'} ,
    {'Lat': 34.54222222222222, 'Long': 51.50138888888889, 'name': 'RABAM'} ,
    {'Lat': 38.801111111111105, 'Long': 45.74194444444444, 'name': 'RABDI'} ,
    {'Lat': 37.811388888888885, 'Long': 45.496944444444445, 'name': 'RABEM'} ,
    {'Lat': 34.85, 'Long': 52.265277777777776, 'name': 'RADAL'} ,
    {'Lat': 30.41472222222222, 'Long': 51.427499999999995, 'name': 'RADID'} ,
    {'Lat': 35.134166666666665, 'Long': 50.525277777777774, 'name': 'RAGIN'} ,
    {'Lat': 37.9375, 'Long': 47.12694444444445, 'name': 'RAKED'} ,
    {'Lat': 37.47916666666667, 'Long': 49.016666666666666, 'name': 'RALGO'} ,
    {'Lat': 35.48583333333333, 'Long': 58.82805555555556, 'name': 'RAMIL'} ,
    {'Lat': 32.544444444444444, 'Long': 52.988055555555555, 'name': 'RANDU'} ,
    {'Lat': 36.88972222222222, 'Long': 49.92111111111111, 'name': 'RARTA'} ,
    {'Lat': 33.169444444444444, 'Long': 49.734722222222224, 'name': 'RASLA'} ,
    {'Lat': 37.286944444444444, 'Long': 56.868611111111115, 'name': 'RIBOB'} ,
    {'Lat': 37.67388888888889, 'Long': 58.24722222222222, 'name': 'RIKOP'} ,
    {'Lat': 27.544722222222223, 'Long': 53.888888888888886, 'name': 'ROTAL'} ,
    {'Lat': 35.45, 'Long': 52.68611111111111, 'name': 'ROVAD'} ,
    {'Lat': 37.26694444444444, 'Long': 45.88944444444444, 'name': 'ROVON'} ,
    {'Lat': 37.67916666666667, 'Long': 46.96138888888889, 'name': 'RUDAD'} ,
    {'Lat': 34.34305555555556, 'Long': 47.77305555555555, 'name': 'RULIK'} ,
    {'Lat': 36.816111111111105, 'Long': 51.15611111111111, 'name': 'SEMSU'} ,
    {'Lat': 35.655833333333334, 'Long': 50.504444444444445, 'name': 'SESBI'} ,
    {'Lat': 29.579722222222223, 'Long': 51.07805555555556, 'name': 'SESMA'} ,
    {'Lat': 37.9375, 'Long': 45.922777777777775, 'name': 'SETNA'} ,
    {'Lat': 38.745555555555555, 'Long': 45.7825, 'name': 'SIBVU'} ,
    {'Lat': 29.9325, 'Long': 58.695277777777775, 'name': 'SILKO'} ,
    {'Lat': 37.135, 'Long': 58.001666666666665, 'name': 'SILPO'} ,
    {'Lat': 32.946666666666665, 'Long': 56.936388888888885, 'name': 'SIMDU'} ,
    {'Lat': 29.03527777777778, 'Long': 52.925555555555555, 'name': 'SITEN'} ,
    {'Lat': 37.59805555555556, 'Long': 49.08638888888889, 'name': 'SIVIT'} ,
    {'Lat': 33.02194444444444, 'Long': 52.0025, 'name': 'SIVUD'} ,
    {'Lat': 33.7725, 'Long': 48.731388888888894, 'name': 'SOGOT'} ,
    {'Lat': 33.221111111111114, 'Long': 60.63166666666667, 'name': 'SOKAM'} ,
    {'Lat': 28.797777777777778, 'Long': 56.171388888888885, 'name': 'SOLAK'} ,
    {'Lat': 36.556666666666665, 'Long': 48.79222222222222, 'name': 'SUTBU'} ,
    {'Lat': 30.01638888888889, 'Long': 55.395833333333336, 'name': 'TAKRA'} ,
    {'Lat': 34.42527777777777, 'Long': 57.69194444444444, 'name': 'TASLU'} ,
    {'Lat': 28.18305555555556, 'Long': 56.55472222222222, 'name': 'TAVNO'} ,
    {'Lat': 37.581944444444446, 'Long': 45.48277777777778, 'name': 'TOTBO'} ,
    {'Lat': 32.09111111111111, 'Long': 53.73916666666667, 'name': 'TOVTA'} ,
    {'Lat': 37.505, 'Long': 45.43583333333333, 'name': 'TUBAR'} ,
    {'Lat': 37.85611111111111, 'Long': 44.72166666666667, 'name': 'TUDNU'} ,
    {'Lat': 38.77388888888889, 'Long': 47.74611111111111, 'name': 'TUKDO'} ,
    {'Lat': 36.9525, 'Long': 50.78444444444444, 'name': 'TUKLO'} ,
    {'Lat': 37.217222222222226, 'Long': 56.933055555555555, 'name': 'TULER'} ,
    {'Lat': 36.47666666666667, 'Long': 48.709722222222226, 'name': 'TULGU'} ,
    {'Lat': 33.01722222222222, 'Long': 58.84, 'name': 'TULKU'} ,
    {'Lat': 38.0, 'Long': 51.016666666666666, 'name': 'ULDUS'} ,
    {'Lat': 30.133333333333333, 'Long': 49.5925, 'name': 'VATAN'} ,
    {'Lat': 28.857222222222223, 'Long': 51.276666666666664, 'name': 'VATOB'} ,
    {'Lat': 29.280555555555555, 'Long': 53.894444444444446, 'name': 'VAVAS'} ,
    {'Lat': 31.5375, 'Long': 54.690555555555555, 'name': 'VEDOP'} ,
    {'Lat': 35.118611111111115, 'Long': 51.655833333333334, 'name': 'VELAP'}];

// initialize Iran's Airports
var airports_coord = [{'name':'Imam', 'Lat':35.4, 'Long':51.15}, 
    {'name':'Abadan', 'Lat':30.37, 'Long':48.217},
    {'name':'Isfahan', 'Lat':32.75, 'Long':51.85},
    {'name':'Kish', 'Lat':26.527, 'Long':53.965},
    {'name':'Mashad', 'Lat':36.23, 'Long':59.63}
];

//waypoint Markers
var wp_markers = [];
var wp_Icon = L.icon({
    //iconUrl: 'https://static.thenounproject.com/png/326449-200.png'
    iconUrl: 'icons/wp.png',
    iconSize: [20, 20], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
});
//Airports Marker
var ap_markers = []
var ap_Icon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/9/9771.png',
    iconSize: [25, 25], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
});

//Function to convert coordinates to markers on map
function add_coord(icon_name, coordinates_array) {
    var markers = []
    coordinates_array.forEach(function(coord) {
        var marker = L.marker([coord.Lat, coord.Long], { icon: icon_name})
        marker.bindPopup('<b>' + coord.name + '</b><br>Lat: ' + coord.Lat.toFixed(2) + '<br>Long: ' + coord.Long.toFixed(2));
        markers.push(marker);
    });
    return markers
}
// Create and add markers to the map
var wp_group = L.layerGroup(add_coord(wp_Icon, waypoints_coord));
var ap_group = L.layerGroup(add_coord(ap_Icon, airports_coord));

var map = L.map('map' , {
    center: [my_path[1].lat, my_path[1].long],
    zoom: 7,
    layers: [googleTileLayer, ap_group]
});
var baseMaps = {
    "GoogleMap": googleTileLayer,
    "OpenStreetMap": openStreetMapTileLayer,
    "openTopoMap": openTopoMap,
    "weatherTileLayer":weatherTileLayer
};

var overlayMaps = {
    "WayPoints": wp_group,
    "Airports": ap_group
};
var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

// Add compass control to the map
var compass = new L.Control.Compass({
    autoActive: true,  // Activate the compass automatically
    showDigit: true,   // Show the compass bearing
}).addTo(map);


// set origin and destination
function validateLatLng(lat, lng) {
    return !isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

// Function to set markers and draw the flight trajectory
function setMarkersAndTrajectory() {
    // Get input values
    var startLat = parseFloat(document.getElementById('startLat').value);
    var startLng = parseFloat(document.getElementById('startLng').value);
    var endLat = parseFloat(document.getElementById('endLat').value);
    var endLng = parseFloat(document.getElementById('endLng').value);

    // Validate input values
    if (validateLatLng(startLat, startLng) && validateLatLng(endLat, endLng)) {
        // Clear existing markers and polylines
        map.eachLayer(function (layer) {
            if (layer instanceof L.Marker || layer instanceof L.Polyline) {
                map.removeLayer(layer);
            }
        });

        // Add markers
        var startMarker = L.marker([startLat, startLng]).addTo(map).bindPopup('Start: ' + startLat.toFixed(6) + ', ' + startLng.toFixed(6)).openPopup();
        var endMarker = L.marker([endLat, endLng]).addTo(map).bindPopup('End: ' + endLat.toFixed(6) + ', ' + endLng.toFixed(6)).openPopup();

        // Draw polyline
        var latlngs = [[startLat, startLng], [endLat, endLng]];
        var polyline = L.polyline(latlngs, { color: 'red' }).addTo(map);

        // Fit map bounds to the polyline
        map.fitBounds(polyline.getBounds());
    } else {
        alert('Please enter valid latitude and longitude values.');
    }
}
// on map click popups
var popup = L.popup();
function onMapClick(e) {
    var lat = e.latlng.lat.toFixed(2);
    var lng = e.latlng.lng.toFixed(2);
    var content = `Lat: ${lat}<br> Long: ${lng}`;
    popup
        .setLatLng(e.latlng)
        .setContent(content)
        .openOn(map);
}

// enabling popup
//map.on('click', onMapClick); 

// Create a custom icon for the airplane marker
var airplaneIcon = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Plane_icon.svg/238px-Plane_icon.svg.png', 
    iconSize: [30, 30],
    iconAnchor: [1, 1],
    
});
var myairplane = L.icon({
    iconUrl: 'plane.png',
    iconSize: [35, 35],
    iconAnchor: [1, 1],
    
});

var mymarker =  L.marker([TEH_KSH[1].lat, TEH_KSH[1].long], {icon: myairplane},{name: 'TEH_KSH'});
var DUB_SHI_marker = L.marker([DUB_SHI[1].lat, DUB_SHI[1].long], {icon: airplaneIcon},{name: 'DUB_SHI'});
var TEH_LON_marker = L.marker([TEH_LON[1].lat, TEH_LON[1].long], {icon: airplaneIcon},{name: 'TEH_LON'});
var TEH_RSH_marker = L.marker([TEH_RSH[1].lat, TEH_RSH[1].long], {icon: airplaneIcon},{name: 'TEH_RSH'});
var TEH_DUB_marker = L.marker([TEH_DUB[1].lat, TEH_DUB[1].long], {icon: airplaneIcon},{name: 'TEH_DUB'});
var MSH_DUB_marker = L.marker([MSH_DUB[1].lat, MSH_DUB[1].long], {icon: airplaneIcon},{name: 'MSH_DUB'});
var TEH_CLN_marker = L.marker([TEH_CLN[1].lat, TEH_CLN[1].long], {icon: airplaneIcon},{name: 'TEH_CLN'});
var MIA_DUB_marker = L.marker([MIA_DUB[1].lat, MIA_DUB[1].long], {icon: airplaneIcon},{name: 'MIA_DUB'});

// Function to update the marker position 
var polylines = [];      
var index = 1;
async function updateMarkerPosition(marker, path){
    if (index < path.length) {
        var angle = path[index].track+60;  
        var data0 = path[index];
        var inform = path[0]; //flight information (route,type, etc...)
        marker.setLatLng([data0.lat, data0.long]);
        marker.setRotationAngle(angle);
        
        // show path if marker clicked
        marker.on('click', function (e){
            map.eachLayer(function(layer) {
                if (layer instanceof L.Polyline) {
                    map.removeLayer(layer);
                }
            });
            
            let justpath = path.slice(1);
            var polylinePoints = justpath.map(function(point) {
                return [point.lat, point.long];
            });
            var polyline = L.polyline(polylinePoints, {color: `rgb(60, 6, 77)`}).addTo(map);
            //map.fitBounds(polyline.getBounds());
        
            var popup = document.getElementById('custom-popup');
            popup.style.display = 'block';  // Show the popup
            popup.innerHTML = `<div>Route: ${inform.title}<br>${inform.airport_codes} <br> type: ${inform.aircraft_type} <br> heading: ${data0.track}
            <br> speed: ${data0.speed} (kts)<br> altitude: ${data0.altitude}000ft </div>`;
        });
        
        // hide the popup when clicking on the map
        map.on('click', function(e) {
            var popup = document.getElementById('custom-popup');
            popup.style.display = 'none';  // Hide the popup
        });
        //marker.bindPopup(` path: ${marke} heading: ${data0.track}<br> speed: ${data0.speed}kts`);

        // move the map with airplane
        if (follow === 1 && marker === mymarker){
            map.setView([data0.lat, data0.long], map.getZoom(), { animate: true });
           
        }
        index++;
    }else{
        marker.remove();
    }
    //TAWS need to add
};

function add_flight(marker,path){
    marker.addTo(map);
    setInterval(() => updateMarkerPosition(marker, path), 4000);
}

add_flight(TEH_LON_marker, TEH_LON); 
add_flight(TEH_DUB_marker, TEH_DUB);
add_flight(MSH_DUB_marker, MSH_DUB);
add_flight(DUB_SHI_marker, DUB_SHI);
add_flight(TEH_RSH_marker, TEH_RSH);
add_flight(TEH_CLN_marker, TEH_CLN);
add_flight(MIA_DUB_marker, MIA_DUB);
add_flight(mymarker, TEH_KSH);

// functionality for buttons
document.getElementById('button-top-left').onclick = function() {
    
};

document.getElementById('button-top-right').onclick = function() {
    if (map.hasLayer(googleTileLayer)) {
        map.removeLayer(googleTileLayer);
        map.addLayer(googleNolabel);
    } else {
        map.removeLayer(googleNolabel);
        map.addLayer(googleTileLayer);
    }
};

var follow = 0;
document.getElementById('button-bottom-left').onclick = function() {
    if (follow === 0){
        follow = 1;
        
    }else{
        follow = 0;
    }   
};

document.getElementById('button-bottom-right').onclick = function() {
    alert('Bottom Right button clicked');
};
document.getElementById('button-center-left').onclick = function() {
    
};

document.getElementById('button-center-right').onclick = function() {
    alert('Center Right button clicked');
};

document.getElementById('button-center-top').onclick = function() {
    toggleCompass();
};

document.getElementById('button-center-bottom').onclick = function() {
};
document.getElementById('setMarkersButton').addEventListener('click', setMarkersAndTrajectory);