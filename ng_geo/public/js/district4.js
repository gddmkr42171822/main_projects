var district4Landmarks = [
    ['Highland Way Apartments - 11310 Melody Dr', 39.902590, -104.993275, 'Apt: A'],
    ['The Greens at Northglenn - 350 W 114th Ave', 39.902748, -104.990552, 'Apt: B'],
    ['The Village at North Hills - 11450 Melody Dr', 39.903761, -104.992823, 'Apt: C'],
    ['Glenn Park Village - 11230 Grant Dr', 39.900432, -104.981092, 'Apt: D'],
    ['Squire Village - 11180 Grant Dr', 39.900156, -104.980464, 'Apt: E'],
    ['Texas Roadhouse - 231 W 104th Ave', 39.886755, -104.989038, 'Bars: A'],
    ['Vantage Point High School - 10900 Huron St', 39.893683, -104.995744, 'Schools: A'],
    ['Stukey Elementary School - 11080 Grant Dr', 39.897642, -104.980637, 'Schools: B'],
    ['The Studio School - 10604 Grant Dr', 39.888838, -104.981931, 'Schools: C'],
    ['Global Village Academy - 555 W 112th Ave', 39.901416, -104.994714, 'Schools: D'],
    ['Saint Stephens Lutheran Church - 10828 Huron St', 39.892648, -104.996038, 'Churches: A'],
    ['Good Shepherd Presbyterian Church - 10785 Melody Dr', 39.892096, -104.993484, 'Churches: B'],
    ['Immaculate Heart of Mary Catholic Parish - 11385 Grant Dr', 39.902365, -104.982605, 'Churches: C'],
    ['Church of Jesus Christ of Latter Day Saints - 100 Malley Dr', 39.903314, -104.986296, 'Churches: D'],
    ['BBVA Compass Bank - 11210 Huron St', 39.900194, -104.995705, 'Banks: A'],
    ['U.S. Bank - 10520 Melody Dr', 39.887184, -104.992857, 'Banks: B'],
    ['Charles C. Winburn Park - 11100 Blk of Huron St', 39.896804, -104.995949, 'Parks: A'],
    ['Eleanor M. Wyatt/Centennial Park - Kennedy Dr between Melody Dr and Acoma St', 39.891932, -104.991070, 'Parks: B'],
    ['Huron Crossing Park - W 117th Ave and Melody Dr', 39.909097, -104.994572, 'Parks: C'],
    ['Kiwanis Park and Pool - Garland Dr and Blue Jay Ln', 39.890063, -104.979775, 'Parks: D'],
    ['City Hall - 11701 Community Center Dr', 39.909615, -104.988466, 'Facilities: A'],
    ['Pedestrian underpass - 11900 Blk of I-25', 39.911957, -104.989981, 'Other: A'],
    ['Pedestrian underpass - 11100 Blk of I-25', 39.898031, -104.987320, 'Other: B'],
    ['Pedestrian overpass - 10700 Blk of I-25', 39.890730, -104.987288, 'Other: C'],
    ['Adams County Library - 10530 Huron St', 39.887245, -104.996159, 'Other: D'],
    ['The Marketplace at Northglenn - W 104th Ave and Market Pl', 39.886170, -104.991344, 'Other: E'],
    ['Malley Heights Shopping Center - Malley Dr and Washington St', 39.902388, -104.978940, 'Other: F'],
    ['Garland Center - Garland Dr and Washington St', 39.891380, -104.978591, 'Other: G'],
    ['Northglenn Ambulance - 10655 Washington St', 39.889673, -104.978063, 'Other: H'],
    ['Walmart - 10755 Washington St', 39.891416, -104.979273, 'Other: I']
];

var district4Locations = [
    ['W 118th Ave', 39.910993, -104.995378, '254'],
    ['Galapago Ct', 39.910348, -104.996007, '255'],
    ["Galapago Ct", 39.907622, -104.995995, "255"],
    ["Melody Dr", 39.908322, -104.994921, "223"],
    ['Elati Ct', 39.910330, -104.993905, '256'],
    ['Delaware Ct', 39.910031, -104.992835, '257'],
    ['W 117th Ave', 39.909290, -104.994551, '258'],
    ['W 116th Way', 39.908780, -104.993156, '259'],
    ['W 116th Pl', 39.907991, -104.995349, '260'],
    ['Acoma St', 39.909019, -104.991761, '261'],
    ['W 116th Ave', 39.907150, -104.993829, '262'],
    ['W 115th Ave', 39.905636, -104.993606, '263'],
    ['W 114th Way', 39.905208, -104.994260, '264'],
    ["W 114th Ave", 39.901761, -104.989866, "267"],
    ['W 114th Pl', 39.904525, -104.993659, '265'],
    ['Cherokee St', 39.903867, -104.991417, '266'],
    ['W 114th Ave', 39.903304, -104.995540, '267'],
    ["Melody Dr", 39.904138, -104.994515, "223"],
    ["Melody Dr", 39.902888, -104.993512, "223"],
    ["Community Center Dr", 39.901029, -104.991919, "2"],
    ["Melody Dr", 39.898339, -104.993745, "223"],
    ['W 112th Ave', 39.899691, -104.993103, '268'],
    ['Elati St', 39.898794, -104.992588, '269'],
    ['Cherokee St', 39.898827, -104.991183, '270'],
    ['Pinon Dr', 39.898259, -104.989863, '271'],
    ['Acoma St', 39.896910, -104.988568, '272'],
    ['Bonita Pl', 39.896194, -104.990269, '273'],
    ['Bannock St', 39.895470, -104.989604, '274'],
    ['Verna Ln', 39.894318, -104.990645, '275'],
    ['Wallace St', 39.893059, -104.990323, '276'],
    ['Patterson Ct', 39.894351, -104.992941, '277'],
    ['Hermosa Ct', 39.895207, -104.994003, '278'],
    ['Wellington St', 39.892482, -104.991053, '279'],
    ["Kennedy Dr", 39.891478, -104.990266, "186"],
    ["Melody Dr", 39.890725, -104.993286, "223"],
    ['Lincoln Dr', 39.902978, -104.985709, '280'],
    ['Sherman Dr', 39.902641, -104.984851, '282'],
    ['Highline Dr', 39.901365, -104.984872, '283'],
    ['E 113th Pl', 39.902213, -104.986750, '284'],
    ['Grant Dr', 39.901252, -104.981219, '285'],
    ["Grant Dr", 39.896045, -104.981185, "285"],
    ["Grant Dr", 39.892530, -104.983430, "285"],
    ['Grant Dr', 39.887450, -104.982294, '285'],
    ['E 112th Dr', 39.901013, -104.984030, '286'],
    ['E 112th Cir', 39.900308, -104.983337, '287'],
    ['E 112th Pl', 39.900045, -104.981891, '288'],
    ['E 111th Pl', 39.899263, -104.983855, '289'],
    ['Northglenn Dr', 39.896836, -104.986593, '290'],
    ["Northglenn Dr", 39.892531, -104.984259, "290"],
    ['Northglenn Dr', 39.890409, -104.981811, '290'],
    ['Emery Rd', 39.898520, -104.982326, '291'],
    ['Pearl St', 39.897993, -104.978335, '292'],
    ['Pearl St', 39.886430, -104.978412, '292'],
    ['Janice Ct', 39.897861, -104.982262, '293'],
    ['Muriel Dr', 39.897779, -104.984193, '294'],
    ['Pearl Way', 39.895746, -104.980320, '295'],
    ['Pearl Cir', 39.896265, -104.979397, '296'],
    ['Linda Sue Ln', 39.897121, -104.984279, '297'],
    ['Leonard Ln', 39.896517, -104.985330, '298'],
    ['E 109th Pl', 39.895760, -104.984633, '299'],
    ['Blue Jay Ln', 39.894056, -104.980331, '300'],
    ['Pearl Ct', 39.893998, -104.979290, '301'],
    ['E 109th Ave', 39.894673, -104.983775, '302'],
    ['Teal St', 39.894212, -104.984505, '303'],
    ['Carrol Ln', 39.893109, -104.981769, '304'],
    ['Pike St', 39.894401, -104.985674, '305'],
    ['Logan Ct', 39.890919, -104.983024, '306'],
    ['E 108th Ave', 39.892006, -104.985384, '307'],
    ['E 107th Pl', 39.891117, -104.984794, '308'],
    ['E 107th Ave', 39.890557, -104.985416, '309'],
    ['E 106th Pl', 39.889734, -104.985137, '310'],
    ['Garland Dr', 39.888837, -104.984245, '103'],
    ['Garland Dr', 39.889740, -104.980762, '103'],
    ['E 106th Ave', 39.888310, -104.985297, '313'],
    ['E 105th Ave', 39.886976, -104.984610, '311'],
    ['Lincoln St', 39.886423, -104.985092, '312'],
    ['Sherman St', 39.886427, -104.984158, '7'],
    ['Grant St', 39.886433, -104.983240, '8'],
    ['Lincoln St', 39.890903, -104.986431, '321'],
    ['E 104th Pl', 39.885849, -104.984564, '318'],
    ['Washington Way', 39.887063, -104.981041, '315'],
    ['Pennsylvania St', 39.886857, -104.980140, '316'],
    ['Pearl Way', 39.886367, -104.979480, '317'],
    ['Washington St', 39.892143, -104.977672, '16'],
    ["Market Pl", 39.887952, -104.990519, "nl1"]
];

var district4Coordinates = [{
        lat: 39.899748,
        lng: -104.996715
    },
    {
        lat: 39.911460,
        lng: -104.996644
    },
    {
        lat: 39.911535,
        lng: -104.993083
    },
    {
        lat: 39.913385,
        lng: -104.993049
    },
    {
        lat: 39.913421,
        lng: -104.993841
    },
    {
        lat: 39.914029,
        lng: -104.993748
    },
    {
        lat: 39.914066,
        lng: -104.989884
    },
    {
        lat: 39.901676,
        lng: -104.988598
    },
    {
        lat: 39.902706,
        lng: -104.987602
    },
    {
        lat: 39.903896,
        lng: -104.987393
    },
    {
        lat: 39.903825,
        lng: -104.985425
    },
    {
        lat: 39.903061,
        lng: -104.981673
    },
    {
        lat: 39.902990,
        lng: -104.977713
    },
    {
        lat: 39.885258,
        lng: -104.977760
    },
    {
        lat: 39.885273,
        lng: -104.993281
    },
    {
        lat: 39.891281,
        lng: -104.993281
    },
    {
        lat: 39.892115,
        lng: -104.992832
    },
    {
        lat: 39.893068,
        lng: -104.994988
    },
    {
        lat: 39.893094,
        lng: -104.996696
    },
];