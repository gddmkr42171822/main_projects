var district1Landmarks = [
    ['The Oslo Apartments - 11501 Washington St', 39.906586, -104.980819, 'Apt: A'],
    ['Webster Lake Apartments - 11701 Washington St', 39.909420, -104.979011, 'Apt: B'],
    ['Thistle Sage Apartments - 11801 Washington St', 39.911137, -104.979029, 'Apt: C'],
    ['The Registry Apartments - 12150 Race St', 39.915181, -104.962732, 'Apt: D'],
    ['Griffis North Metro Apartments Phase 1 - 12255 Claude Ct', 39.916412, -104.959886, 'Apt: E'],
    ['Griffis North Metro Apartments Phase 2 - 12275 Claude Ct', 39.917917, -104.961144, 'Apt: F'],
    ['Aspen Park Apartments - 301 Malley Dr', 39.904181, -104.984178, 'Apt: G'],
    ['Reserve at Northglenn - 11450 Community Center Dr', 39.904819, -104.986302, 'Apt: H'],
    ['Park Villas Town Homes 1 - 11500 Community Center Dr', 39.905916, -104.987034, 'Apt: I'],
    ['Park Villas Town Homes 2 - 11600 Community Center Dr', 39.907987, -104.987049, 'Apt: J'],
    ['Stone Mountain Apartments - 11625 Community Center Dr', 39.907269, -104.988471, 'Apt: K'],
    ['Carrick Bend Apartments - 11525 Community Center Dr', 39.905544, -104.988576, 'Apt: L'],
    ['@Cheers - 11964 Washington St', 39.913463, -104.976573, 'Bars: A'],
    ['Loyal Order of Moose Lodge - 11500 Blk of York St', 39.903530, -104.959201, 'Bars: B'],
    ['Colorado Bar and Grill - Inside Ramada Plaza', 39.912475, -104.988278, 'Bars: C'],
    ['STEM Lab School - 11700 Irma Dr', 39.908276, -104.967734, 'Schools: A'],
    ['Hulstrom Options School - 11551 Wyco Dr', 39.905571, -104.965685, 'Schools: B'],
    ['Malley Elementary - 1300 Malley Dr', 39.903435, -104.972139, 'Schools: C'],
    ['Calvary Community Baptist Church - E 120th Ave and Irma Dr', 39.913658, -104.967191, 'Churches: A'],
    ['Northside Baptist Church - 11550 Washington St', 39.906286, -104.977031, 'Churches: B'],
    ['New Life Fellowship - Malley Dr and Irma Dr', 39.904820, -104.968497, 'Churches: C'],
    ['Chase Bank - 500 E 120th Ave', 39.912239, -104.980585, 'Banks: A'],
    ['BBVA Compass Bank - 480 E 120th Ave', 39.913724, -104.981031, 'Banks: B'],
    ['Credit Union Service Center - 500 E 120th Ave', 39.912433, -104.981146, 'Banks: C'],
    ['Horizons North Credit Union - E 114th Ct and Pearl St', 39.905536, -104.979753, 'Banks: D'],
    ['E.B. Rains Memorial Park - 11700 Community Center Dr', 39.910336, -104.986386, 'Parks: A'],
    ['Wyco Park - 11500 Wyco Dr', 39.907519, -104.966352, 'Parks: B'],
    ['Northglenn Maintenance Shops - 12300 Blk of Claude Ct', 39.919893, -104.962058, 'Facilities: A'],
    ['Northglenn Heights Assisted Living - 11475 Pearl St', 39.905479, -104.981055, 'Other: A'],
    ['Kindred Healthcare Nursing Home - 401 Malley Dr', 39.904024, -104.981876, 'Other: B'],
    ['Palmer Plaza Shopping Center - E 114th Ct and Washington St', 39.904589, -104.978218, 'Other: C'],
    ['Webster Lake Shopping Center - 11900 Blk of Washington St', 39.913078, -104.981723, 'Other: D'],
    ['Safeway - 500 E 120th Ave', 39.912257, -104.981242, 'Other: E'],
    ['U.S. Post Office - 11900 Blk of Washington St', 39.912167, -104.978697, 'Other: F'],
    ['Highline Canal - Malley Dr and Highline Dr', 39.903476, -104.983366, 'Other: G']
];

var district1Locations = [
    ['E 120th Ave', 39.913953, -104.972143, '1'],
    ['Community Center Dr', 39.913135, -104.986563, '2'],
    ['Community Center Dr', 39.906961, -104.987356, '2'],
    ['Grant St', 39.912383, -104.985359, '3'],
    ['E 118th Pl', 39.911452, -104.982666, '4'],
    ['Lincoln St', 39.910685, -104.983025, '5'],
    ['E 118th Ave', 39.910519, -104.979857, '6'],
    ['Sherman St', 39.909957, -104.982188, '7'],
    ["Sherman St", 39.908201, -104.982020, "7"],
    ['Grant St', 39.909733, -104.981399, '8'],
    ["Grant St", 39.907782, -104.981125, "8"],
    ["Logan St", 39.907743, -104.980230, "9"],
    ['Logan St', 39.909805, -104.980572, '9'],
    ["Pennsylvania St", 39.908168, -104.979349, "10"],
    ['Pennsylvania St', 39.909813, -104.979785, '10'],
    ['E 117th Ave', 39.908557, -104.981619, '11'],
    ['E 116th Ave', 39.907324, -104.982019, '12'],
    ['E 116th Ave', 39.907334, -104.979646, '12'],
    ['Pearl St', 39.907646, -104.978434, '13'],
    ['Pearl St', 39.905560, -104.979247, '14'],
    ['E 114th Ct', 39.904929, -104.978759, '15'],
    ['Washington St', 39.909159, -104.977766, '16'],
    ['Sylvia Dr', 39.912306, -104.975016, '17'],
    ['McCrumb Dr', 39.912037, -104.974195, '18'],
    ['Quam Dr', 39.911825, -104.973248, '19'],
    ['Spring Dr', 39.911350, -104.972524, '20'],
    ['Keough Dr', 39.911865, -104.971084, '21'],
    ['Lafayette St', 39.912552, -104.969905, '22'],
    ['Humboldt Dr', 39.912318, -104.969010, '23'],
    ['Irma Dr', 39.912442, -104.968022, '24'],
    ['Williams Way', 39.912065, -104.966378, '25'],
    ['Williams Way', 39.910580, -104.966055, '25'],
    ['High St', 39.911678, -104.965477, '26'],
    ['Lavinia Way', 39.912863, -104.964832, '27'],
    ['Lavinia Ln', 39.912508, -104.963797, '28'],
    ['Gaylord Way', 39.912090, -104.962742, '29'],
    ['Claude Way', 39.912400, -104.961882, '30'],
    ["E 119th Pl", 39.913397, -104.971184, "31"],
    ['E 119th Pl', 39.913369, -104.963535, '31'],
    ['Race St', 39.916056, -104.963747, '32'],
    ['Claude Ct', 39.915479, -104.959593, '33'],
    ['Claude Ct', 39.910166, -104.959794, '33'],
    ['Maiden Way', 39.910781, -104.964187, '34'],
    ['Gilpin St', 39.910781, -104.967280, '35'],
    ['Truda Dr', 39.909670, -104.969814, '36'],
    ['Phillips Dr', 39.908773, -104.971305, '37'],
    ['Bowman Pl', 39.908222, -104.970103, '38'],
    ['Dean Dr', 39.909074, -104.972404, '39'],
    ['Monte Way', 39.908761, -104.973702, '40'],
    ['E 115th Pl', 39.906473, -104.975419, '41'],
    ['E 115th Ave', 39.905650, -104.975580, '42'],
    ['Clarkson St', 39.904794, -104.976943, '43'],
    ['Carlile St', 39.904712, -104.975892, '44'],
    ['Emerson St', 39.904803, -104.974969, '45'],
    ['E 114th Pl', 39.903774, -104.975226, '46'],
    ['Larson Ln', 39.904877, -104.974014, '47'],
    ['Ogden St', 39.905892, -104.973355, '48'],
    ['Downing St', 39.906147, -104.972475, '49'],
    ['Marion St', 39.906435, -104.971585, '50'],
    ['Fowler Dr', 39.906838, -104.970705, '51'],
    ['Humboldt St', 39.906657, -104.969793, '52'],
    ['Gilpin St', 39.906204, -104.967722, '53'],
    ['Wyco Dr', 39.906525, -104.965029, '54'],
    ['E 117th Ct', 39.908747, -104.964879, '55'],
    ['E 117th Way', 39.907842, -104.965094, '56'],
    ['E 116th Dr', 39.907751, -104.961983, '57'],
    ['E 116th Pl', 39.907060, -104.963378, '58'],
    ['E 116th Ave', 39.906344, -104.964268, '59'],
    ['E 115th Pl', 39.905661, -104.963270, '60'],
    ['E 115th Ave', 39.904970, -104.963806, '61'],
    ['Fisher Way', 39.904254, -104.962776, '62'],
    ['E 114th Pl', 39.903554, -104.962207, '63'],
    ['E 114th Ave', 39.902896, -104.962776, '64'],
    ['E 113th Pl', 39.902164, -104.962036, '65'],
    ['E 113th Ave', 39.901485, -104.962589, '66'],
    ['High St', 39.902718, -104.964467, '67'],
    ['E 114th Pl', 39.903645, -104.965834, '68'],
    ['E 114th Ave', 39.902954, -104.965158, '69'],
    ['E 113th Pl', 39.902353, -104.964643, '70'],
    ['E 113th Ave', 39.901497, -104.965083, '71'],
    ['Graves Ct', 39.900814, -104.964632, '72'],
    ['E 112th Pl', 39.900114, -104.965480, '73'],
    ['Fowler Dr', 39.901752, -104.967443, '74'],
    ['E 114th Pl', 39.902567, -104.968258, '75'],
    ['Franklin St', 39.901464, -104.968301, '76'],
    ['Humboldt St', 39.902015, -104.969406, '77'],
    ['Lafayette St', 39.901801, -104.970307, '78'],
    ['Marion St', 39.901332, -104.971058, '79'],
    ['Downing Dr', 39.902278, -104.975704, '80'],
    ['Corona Dr', 39.901570, -104.974964, '81'],
    ['Ogden Dr', 39.900912, -104.975940, '82'],
    ['Clarkson St', 39.901274, -104.976841, '83'],
    ['E 112th Ave', 39.899603, -104.975157, '84'],
    ["E 117th Pl", 39.908955, -104.982492, 'nl1'],
    ["Malley Dr", 39.903244, -104.974482, 'nl2'],
    ["Clarkson Ct", 39.911224, -104.976921, "nl3"],
    ["E 115th Ave", 39.906426, -104.978499, "nl4"],
    ["York St", 39.908226, -104.958851, "nl5"]
];

var district1Coordinates = [{
        lat: 39.901679,
        lng: -104.988546
    },
    {
        lat: 39.905864,
        lng: -104.990520
    },
    {
        lat: 39.910360,
        lng: -104.990918
    },
    {
        lat: 39.914176,
        lng: -104.989683
    },
    {
        lat: 39.914199,
        lng: -104.968409
    },
    {
        lat: 39.921375,
        lng: -104.968323
    },
    {
        lat: 39.921408,
        lng: -104.964933
    },
    {
        lat: 39.921284,
        lng: -104.966692
    },
    {
        lat: 39.920239,
        lng: -104.965544
    },
    {
        lat: 39.919400,
        lng: -104.963860
    },
    {
        lat: 39.919869,
        lng: -104.963345
    },
    {
        lat: 39.921474,
        lng: -104.963517
    },
    {
        lat: 39.921177,
        lng: -104.960727
    },
    {
        lat: 39.915960,
        lng: -104.958345
    },
    {
        lat: 39.909986,
        lng: -104.958624
    },
    {
        lat: 39.899484,
        lng: -104.958882
    },
    {
        lat: 39.899673,
        lng: -104.977668
    },
    {
        lat: 39.902908,
        lng: -104.977722
    },
    {
        lat: 39.903040,
        lng: -104.981627
    },
    {
        lat: 39.903929,
        lng: -104.986112
    },
    {
        lat: 39.903913,
        lng: -104.987410
    },
    {
        lat: 39.902621,
        lng: -104.987539
    },
];