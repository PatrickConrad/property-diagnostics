import { convertToString } from "../../helpers/numToString"

export const executiveStatement = `This Repair and Replacement Reserve Schedule Report has been developed for  Homeowners Association, for the specific purpose of reviewing the major components and developing a Repair and Replacement Reserve Schedule based on our research and observation of the property. Our report contains two different methods of reserve analysis.  The first section presents the Component Method and the second section presents the Cash Flow Method.  

The difference between the component method and cash flow method is the component method lists all features of the property that will require repair or replacement over the normal useful life.  The estimated cost of the component method’s annual contribution is based on the owners requirement to fund repairs or replacements at the time of the site analysis.  This may result in short term higher contributions in an effort to catch up short falls in the reserve account.  The component method has no means of readjusting the annual contribution after a component is repaired or replaced.  For example, a roof requiring to be replaced within the next ten years will require an annual contribution of 10% for each year.  After replaced a normal useful life of a roof system is 20 years, which results in an annual contribution of 5%.  The cash flow method takes into account the activities on the property and the expenditures expected over the next 30 years. Thereby, allowing an adjustment to the annual contribution rather than over funding the reserve account.  

The examination was made following generally accepted visual inspection standards and did not include testing of any equipment or physical conditions unless specific reference is made to such testing.  Unless otherwise stated, we have reported only on those items that we were able to observe visually in Level I & Level II evaluations.  The inspection did not include removing portions of construction in order to expose concealed conditions.  The report is intended to fairly present our professional opinion of the condition of the facility and the component parts to which reference is made in the report Level I and Level II as of the date of this inspection.  The report is also based on the information provided to us of the age, materials, equipment, and construction techniques that were used subject to the qualifications expressed in this report. Property Diagnostics, Inc. relies on the owners to submit information pertaining to the replacement activities and attentions of site components. 

Based on the findings in each of the specific areas reviewed, professional judgment was used in forecasting the remaining life expectancy of the systems and components scheduled in the body of this report. The estimated cost of each component has been identified.  The same basis and judgment were used in describing any existing conditions based on estimated cost of all necessary or recommended repairs.  This report, therefore, does not constitute or represent a warranty of the property's condition and should not be viewed as such.  Rather, the report reflects our professional opinion based on the methodology specified above.`


export const recommendations = [
    ['newReport', `We recommend the Association’s Board of Directors update the reserve study every three to five years.  This update would readjust the reserve requirements for the property based on actual experiences and conditions.`]
]


export const componentChartInfo = `The following charts are typically broken down into the following categories, grounds, building envelope, building interior, mechanical/plumbing and electrical components where applicable.  

The charts help identify and quantifies the component items, the estimated cost to repair or replace those items, and the target date with which those repairs or replacements are projected to take place.  The annual contribution is the total cost for repair or replacement, divided by the repair cycle or target date.  This cost has been presented in today's dollars and has not been extrapolated to a future date.  Note: Monies escrowed for future repairs or replacement earns interest, which offsets additional costs caused by inflation.

The chart delineates Reserve/Replacement items.  Some items must be totally replaced in a given year. However, many of the items, in practice, will be repaired or replaced in phases. An example would be a reserve figure to replace concrete walls shown as a total amount to be spent in ten years; in reality sectional replacement is likely.  

The identified remaining life for each component are merely target dates, and are solely based on our experience and expertise.  Observing the conditions of the component or supported information.`



export const componentChartHeadersInfo = {
    items: {
        name: 'Items',
        info: `Column 1, entitled “ITEM”, is a list of commonly owned site components.  Each chart is followed with a narrative describing the intended work for the component listed in this column. The purpose of the narrative is for the owners to have a better understanding of the intended work, which supports the estimated repair or replacement cost.`,
    },
    quantity: {
        name: 'Quantity',
        info: `Column 2, entitled “QUANTITY”, refers to the number of all reflected units of measurement for the material or system furnished or installed.  Following the QUANTITY, applicable units of measurement are abbreviated, as follows:`,
        types: [
            ['Ea',`Each or portion of total system.`],
            ['SQ',`Square of roof or 100 S.F.`],
            ['SF', 'Square Foot'],
            ['LF', 'Linear Foot'],
            ['SY', 'Square Yard'],
            ['LS', `Lump Sum-Total costs of those items required to make the description (task) operational when finite quantities are not defined.`],
            ['Lot', `Entire system where quantities are not defined or are inter-dependent.`],
            ['Unit', `Each or portion of total system.`],
            ['Sys', `Mechanical system complete, including attendant mechanical work to make system function.`],
            ['LOB', `Life of Building`]
        ]
    },
    useLife: {
        name: 'Normal Useful Life',
        info: `Column 3, entitled “NORMAL USEFUL LIFE”, this figure represents a conceptual number of years, which a given item or system can be expected to last at the time of installation.  This figure is derived by using professional judgment and through observations made in the field.`,
    },
    remainingLife: {
        name: 'Estimated Remaining Life',
        info: `Column 4, entitled “ESTIMATED REMAINING LIFE”, this figure represents the estimated time that an existing item or system can be expected to remain useful.  This figure is derived by using professional judgment where items or systems show unusual wear or unusual preservation, or if the items are new by subtracting actual age of the existing item or system from the “Normal Useful Life”.`
    },
    tagetDate: {
        name: 'Target Date',
        info: `Column 5, entitled “TARGET DATE”, reflects the numerical year of replacement for the component.`
    },
    replacementCost: {
        name: 'Current Replacement Cost',
        info: `Column 6, entitled “CURRENT REPLACEMENT COST”, reflects the estimated cost to replace and install an item or system or to perform the described work task.  This figure is calculated using industry-accepted standards, comparing various industry sources, and using professional judgment. Property Diagnostics, Inc. refers to Means price guides, Dodge price guides, and our in-house database.  These figures are for conceptual purposes only and are not based upon detailed engineering or architectural analysis, bid documents, or detailed physical surveys.`
    },
    fund: {
        name: "Current Fund",
        info: `Column 7, entitled “CURRENT FUND”, reflects monies presently assigned to replacement of the indicated system or item in the Replacement Reserve Fund.  This figure is derived by those parties responsible for allocating funds or by Property Diagnostics, Inc. as directed by those responsible parties.`
    },
    remaining: {
        name: "Required Fund",
        info: `Column 8, entitled “Required Fund”, represents those funds required to reach the Current Replacement Cost.  The figure is calculated using the “Current Replacement Cost” less the “Current Fund”.`
    },
    contribution: {
        name: "Annual Contribution",
        info: `Column 9, entitled “ANNUAL CONTRIBUTION”, reflects the component method of funds that should be set aside on an annual basis in order to have the item or system fully funded at completion of the expected useful life period.  This figure is calculated by dividing the “Required Fund” by the “Estimated Remaining Life”.`
    }
}

export const propertyLocations = [
    "Agricultural Grounds",
    'Building Envelope',
    'Building Interior',
    'Mechanical / Plumbing',
    'Electrical',
]

export const items = {
    grounds: [
        ['Concrete', `The estimated replacement cost for concrete includes removal of the existing concrete and replacement of new concrete. New concrete will be reinforced with a rebar material and rated for 3,000 psi. The concrete line-item replacement fund should be considered a draw fund.  Concrete never requires full replacement at one time. However, it does require sectional replacement. Over the life span of the concrete, it is anticipated that all concrete will be renewed at least once.`],
        ['Front Brick Wall', `Brick landscape walls should never require full replacement if properly maintained. The estimated replacement cost is for repair and reconstruction of the wall during the remaining life.`],        
        ['Entrance Pavers', `Over time, pavers will become damaged and require replacement. This is mainly due to weather conditions, and in some cases due to abusive use. The replacement cost is for the replacement of existing pavers with new pavers as needed.`],  
        ['Courtyard Pavers', `Over time, pavers will become damaged and require replacement. This is mainly due to weather conditions, and in some cases due to abusive use. The replacement cost is for the replacement of existing pavers with new pavers as needed. This would be considered a draw fund and, over the duration of the normal useful life, the pavers should require replacement at least once.`],
        ['Courtyard Furniture', `The estimated replacement cost for courtyard furniture anticipates the replacement of the existing furniture with new furniture of similar style and quality.`],
        ['Courtyard Wood Porch & Stairs', `The estimated replacement cost for rear wood porch deck anticipates the replacement of the existing wood porch deck with new wood porch deck of similar rated materials.`],
        ['Courtyard Gate', `The estimated cost is for replacing the existing gates with new gates of similar style and quality.`],
        ['Irrigation System', `The estimated replacement cost for the lawn sprinkler system is based on general restoration of the sprinkler system to include replacement of heads and damaged lines.`]
    ],
    envelope: [
        ['Roof', `By the end of the normal useful life span, the building will consider major renewal of the roof system. The scope of work includes removal of the existing materials, and installation of a new roof system.`],
        ['Pointing', `Over a normal useful life span, it is recommended that defective mortar joints be renewed as needed. This replacement reserve cost category has considered removal of defective mortar, and installation of new mortar as needed. The replacement cost figure anticipates 33% of the building will be repointed.`],        
        ['Caulking', `The estimated replacement cost for caulking is for replacement of caulking around windows, doors and building joints. The caulking replacement cost anticipates full removal of the existing caulking, removal of backer rod material, and installation of new materials.`],
        ['Roof Decks', `Located on the roof of the building, there are areas of decks made of Trex. The replacement cost anticipates the replacement of the existing deck materials with new decks of similar rated materials.`],
        ['Roof Deck Furniture', `The estimated cost is for replacing the existing furniture with new furniture of similar style and quality.`],    
        ['Entry Awning', `The estimated replacement cost is for replacement of the existing awning with new canvas in keeping with the building décor.`],    
        ['Masonry Trim', `Masonry trim is considered to be life of building. However, over the life of the building some damages will occur and localized deterioration. Estimated cost is for the repair of the trim when needed.`],
        ['Windowsills', `The building has masonry windowsills. The reserve figure is for the reconstruction of these masonry units when needed as anticipated on our reserve. New sills will be concrete. Full replacement is not anticipated. The cost figure provided anticipates 10% of the windowsills will need replacement and 80% will need repairs.`],
        ['Windows', `The estimated replacement cost of windows is for replacement of the existing windows with new windows of similar design and quality.`],
        ['Exterior Painting', `The estimated replacement cost for exterior painting is based on replacement of the existing paint and finish on the exterior windows, building trim and metal work with a single coat of exterior paint.`]
    ],
    interior: [
        ['Carpeting', `The estimated replacement cost for carpeting is based on replacement of the existing carpeting with new carpeting of similar style and quality. It is anticipated that at the time of replacement, the existing materials will be removed from the structure and new materials will have proper fire rating.`],
        ['Hallway Painting', `Hallway painting includes the interior finish areas. The estimated cost reflects the cost to replace the existing finish with a new single coat of paint.`],
        ['Stair Painting', `Stair painting includes the interior finish areas. The estimated cost reflects the cost to replace the existing finish with a new single coat of paint.`],
        ['Basement Painting', `Basement painting includes the interior finish areas. The estimated cost reflects the cost to replace the existing finish with a new single coat of paint.`],
        ['Laundry Room Painting', `Laundry room painting includes the interior finish areas. The estimated cost reflects the cost to replace the existing finish with a new single coat of paint.`],
        ['Lobby', `Main lobby furnishing anticipates remodeling the lobby area. Remodeling of lobbies is a subjective number based on the intent of the building owners to maintain the existing quality or upgrade. The estimated replacement cost anticipates replacement of existing finishes and furnishings with new finishes and furnishing of similar style and quality.`],
        ['Rental Unit Renovation', `Rental unit renovation anticipates remodeling the interior area. Remodeling of units is a subjective number based on the intent of the building owners to maintain the existing quality or upgrade. The estimated replacement cost anticipates replacement of existing finishes and furnishings with new finishes and furnishing of similar style and quality.`],
        ['Mailboxes', `The estimated replacement cost is for replacement of the existing mailboxes with new mailboxes of similar style and quality.`],
        ['Bike Rack', `The estimated cost is to replace the existing double decker bicycle rack with a similarly designed and proportioned rack.`],
        ['Storage Units', `The estimated cost is for replacing the existing storage units with new storage units of similar style and quality.`]
        
    ],
    mechanical: [
        ['Domestic Piping', `The estimated replacement cost of the domestic piping is based on replacement of the existing piping with new piping. It is not intended to be replaced at one time. We recommend that this be considered a draw fund and, as repairs are made, the reserve should be drawn on.`],
        ['Waste Piping', `The estimated replacement cost of the waste piping is based on replacement of the existing piping with new piping. It is not intended to be replaced at one time. We recommend that this be considered a draw fund and, as repairs are made, the reserve should be drawn on.`],
        ['Elevator', `The estimated replacement cost for the elevator includes the restoration of the elevator cab to include car and floor buttons, as well as the guide rollers, control cabinet and motor system. During our review, we were made aware of mechanical issues with the elevator. The estimated remaining life has not been adjusted for these issues. A mechanical warranty should be included with the elevator.`],
        ['Entry System', `The estimated replacement cost for entry system includes the replacement of the building electronic entries.`],
        ['Rental Unit AC / Heating System', `The estimated replacement cost for the air conditioning unit/heating system is for the replacement of the existing air conditioning unit/heating system with a new unit and system of similar size and load demand.`],
        ['Hot Water Heater', `The estimated replacement cost for hot water heater is based on the anticipated cost required to update the hot water heating system with a new system to properly handle the building.`]
    ],
    electrical: [
        ['Main Switchgear', `The estimated replacement cost is for replacement of the existing main switchgear with new switchgear of equal ratings and load capacity.`],
        ['Interior Lighting', `The estimated replacement cost for interior lighting is based on replacement of the existing lighting fixtures with similar fixtures.`],
        ['Exterior Lighting', `The estimated replacement cost for exterior lighting is based on replacement of the existing lighting fixtures with similar fixtures.`],
        ['Emergency Lighting', `The estimated replacement cost for emergency lighting anticipates the replacement requirement of the existing lighting units after the normal useful life. The replacement will include removal of the existing units and installation of newer similar units as required.`],
        ['Exit Lighting', `The estimated replacement cost is for replacement of the existing exit lighting with new, more efficient lighting systems.`],
        ['Courtyard Lighting', `The estimated replacement cost for courtyard lighting is based on replacement of the existing lighting fixtures with similar fixtures.`],
        ['Underground Wiring', `The price given is for the replacement of underground electrical utility wiring. It has been assumed that existing wiring will be disconnected, abandoned in place, and new wiring trenched in plastic piping.`],
        ['Fire Alarm System', `The estimated replacement cost anticipates the replacement of the main fire alarm system. This does not include the pull stations, bells or detectors as these are typically handled through maintenance and/or are considered life of building.`]
    ]
}


export const cashFlowInfo = `The Cash Flow Method incorporates the repair and replacement needs of the property over the next thirty years, to include anticipated repair/replacement of components and materials that are performed sectionally. A percentage of components replaced sectionally are ascribed in the thirty-year chart.  The Cash Flow Method allows the Association to reserve funds to maintain the property based on the estimated requirements over the next thirty years.`

export const cashFlowColumns = [
    ['year', `The first column reflects the calendar Year (2022 thru 2051) for each of the 30 years during the life of this report.`],
    ['replacementCosts', `The second column, entitled Total Replacement Costs / 30yrs, shows total projected expenditures for each Year.`],
    ['contribution', `The third column, entitled Yearly Contribution, depicts the figure given to Property Diagnostics, Inc. used to complete this table.`],
    ['currentFund', `The fourth column, entitled Current Fund based on Property's Contribution, shows cash on hand or the Property's current, or projected Reserves based on the annual contributions minus projected replacement costs, by year.`],
    ['recommendation', `The fifth column, entitled Recommended Yearly Contribution, shows Property Diagnostic, Inc. annual contribution recommendation.`],
    ['recommendedFund', `The sixth column, entitled Current Fund based on the Recommended Contribution, depicts how the Property's Reserve Fund will increase over time if projections remain true and inflation does not cause replacement costs to increase over time.`],
]

export const cashFlowChartInfo = (name: string, thirtyYearReplacements: number, thirtyYearContributions: number, inflation?: number, contributionInc?: boolean)=>{
    `The cash flow table, entitled ${name} (${inflation}%) CASH FLOW BREAKDOWN shows the replacement cost with ${!inflation?'no inflation increase':'an inflation rate of 3%, per year'} ${contributionInc?', a '+inflation?.toString()+'% annual increase to the annual contribution':''}, and the current fund with an interest earned rate of 2.3% per year. At the end of thirty years, the property will have ${thirtyYearContributions-thirtyYearReplacements<0?'-':''}$${thirtyYearContributions-thirtyYearReplacements<0?convertToString(parseInt((thirtyYearContributions-thirtyYearReplacements).toString().slice(1))):convertToString(thirtyYearContributions-thirtyYearReplacements)}.`
}

export const fundAssessment = (currentFund: number, contribution: number, thirtyYearReplacements: number, thirtyYearContributions: number, yearFailed?: number) => {
    return `The current reserve fund provided to Property Diagnostics, Inc. as is $${convertToString(currentFund)}. The property's annual contribution is $${convertToString(contribution)}. ${!yearFailed && thirtyYearContributions-thirtyYearReplacements>0?'The amount of funding meets the needs for this property.':'The amount of funding does not meet the needs for this property.'} Based on our calculations, the property will have ${thirtyYearContributions-thirtyYearReplacements<0?'-':''}$${thirtyYearContributions-thirtyYearReplacements<0?convertToString(parseInt((thirtyYearContributions-thirtyYearReplacements).toString().slice(1))):convertToString(thirtyYearContributions-thirtyYearReplacements)} at the end of thirty years without inflation.`
}

export const barChartInfo = [
    ['first', `The first bar chart shows graphically the cash expenditures and cash on hand based on owners yearly contribution.`],
    ['second', `The second bar chart shows graphically the cash expenditures and cash on hand based on Property Diagnostics, Inc.’s recommendation`]
]

export const understandingReport = [
    ["what", "What Is A Reserve Report?", [
        `A Reserve Report identifies all common and limited common property owned by a community that will require replacement or refurbishment over the life of the property.  Reserve Reports quantify these components, determine their typical life spans and remaining life spans, and estimate costs of repair or replacement. Properties use Reserve Reports as a long-term budgeting tool to identify the current status of their Reserve Fund and develop a stable and equitable funding plan to offset ongoing deterioration.`
    ]],
    ['why', 'Why Does A Property Need A Reserve Report?', [
        'Municipalities are beginning to require properties have a Reserve Studies updated regularly. Virginia is one state that requires an updated reserve every five years, and requires reserve reports be given to prospective purchasers.',
        `Reserve Studies provide necessary information used to maintain communities and protect owner's investment.`,
        `Refinancing firms are requiring Reserve Reports be updated on a regular basis, and in some cases will not finance a mortgage if the report is not current or the property is not properly funded. These include Fannie Mae, Freddie Mac and FHA loans.`,
        `Community board members have a fiduciary responsibility to maintain owner's investments.`,
        `Proper planning through Reserve Studies can prevent special assessments.`,
        `Buyers are becoming more aware of how community properties are funded and are requesting a review of financial reports before purchasing.`
    ]],
    ['how', 'How Do We Know?', [
        ['How Long A Component Will Last?', `Property Diagnostics uses any historical information that has been provided by the community, industry documents such as AIA literature, ASHRAE literature, and manufactures literature, which list expected life of materials and components.  Our staff regularly assesses community components and can recognize certain site conditions that allow us to accurately estimate the life expectancy of site components through visual inspection.  Property Diagnostics has a dedicated obligation to be accurate.`],
        ['How Much A Repair or Replacement Cost?', `Property Diagnostics has developed thousands of Reserves over the years which has allowed us to develop a database of projected costs.  Invoices and bids from vendors are continually provided to Property Diagnostics by communities that have recently had worked performed on their property.  Cost guild literature, such as RS Means and The National Insurance Cost Guide, provide accurate replacement costs of components and are updated regularly.`],
        ['Proposals Not Matching Our Reserve Estimate?', `Contact your Reserve service provider. They may be extremely helpful in addressing issues. We had a client that we estimated the roof to have a remaining life of five years an estimated the cost to replace at $38,000.00. They received three proposals with the lowest quoting $78,000.00. They contacted our firm to ask how we could be so far off. Looking at the proposals we discovered the proposals included a lot of things the property did not need. Luckily, they contacted us, and we solicited bids for the base roof replacement, which was replaced for $36,580.00.`]
    ]],
    ['methods', "Component Method VS. Cash Flow Methody", [
        `The Component Method develops a reserve-funding plan where the total contribution is based on the sum of contributions for individual components.  This method is a very conservative approach to funding as it fully funds each component yearly.  However, the Component method has limitations in that the remaining life and annual contribution of each component need to be manually updated.  The Cash Flow Method automatically adjusts for these changes.  The Cash Flow Method is a method of developing a reserve funding plan where contributions to the reserve fund are designed to offset the variable annual expenditures from the reserve fund.  Different reserve funding plans are tested against the anticipated schedule of reserve expenses until the desired funding goal is achieved.`
    ]],
    ['goals', "Funding Goals:  Baseline·Threshold·Full", [
        ['Baseline Funding', `Establishing a reserve funding goal of allowing the reserve cash balance to be at or near zero during the cash flow projection. This is the riskiest funding goal because if an expense arrives early or unexpected there is a significant chance of needing a Special Assessment.`],
        ['Threshold Funding', `Establishing a reserve funding goal of keeping the reserve balance above a specified dollar or percent funded amount. Threshold funding is often a value chosen in between full funding and baseline funding.  The risk with threshold funding varies depending on each properties current Reserve status.`],
        ['Full Funding', `Setting a reserve funding goal to attain and maintain reserves at or near 100 percent funded.  This is the most conservative funding goal.`]
    ]],
    ['updates', 'How Often Should A Reserve Report Be Updated?', [
        ['info', `The Association of Professional Reserve Analysts believe a Reserve should be updated every year. Most properties should have their Reserve updated by a professional every three to five years.  There are three different levels of Reserve Studies:`],
        [`Full Reserve Study`, `We perform a complete site assessment, obtaining or verifying measurements and counts of common area components. This also includes a component condition assessment and photo inventory of most components. We then compile the information obtained into our easy-to-understand reports.`],
        [`Update of Reserve Study with Site Inspection`, `Once a full reserve study has been completed by Property Diagnostics, Inc., we will often perform updates with a site inspection. The level 2 site inspection is less comprehensive than a level 1 site inspection in that we do not obtain or verify measurements and counts unless it appears that there have been changes. We do evaluate condition and update the photo inventory where necessary. We then compile the information obtained into our easy-to-understand report.`],
        [`Update of Reserve Study without Site Inspection`, `An annual update to the reserve study is simply good planning. This allows you to "refresh" the funding plan and account for minor variations from the original funding plan. We inquire about expenditures made, changes in pricing of replacement costs, and variations in funding from the original plan, but do not perform a site inspection. This is a valuable planning tool at a very reasonable cost, generally no more than 25% of the cost of a full study.`]
    ]],
    ['categories', `Site Component Categories`, [
        ['info', `With every Reserve, site components will fall into a variation of the following three categories:`],
        ['subjective', `Subjective Components are items that are replaced depending on owners' preferences or tolerations`, [
            'carpeting',
            'interior painting',
            'elevator cab refurbishment',
            'Interior lighting'
        ]],
        ['fixed', `Fixed Components are items that fail on regular basis having little variation between properties.`, [
            'roof system',
            'exterior painting',
            'caulking',
            'asphalt surfaces'
        ]],
        ['variable', `Variable Components are items that vary widely pertaining to life cycles on properties.`, [
            'elevators',
            'mechanical equipment',
            'electrical switchgear',
            'piping',
            'fire alarm systems'
        ]],
        ['outro', `Owners should be aware of these types of issues when reviewing their reserve reports and engage with the reserve firm to tailor their plans to meet and suit their needs.`]
    ]],
    ['when', `When To Use Funds From The Reserve`, [
        ['info', `Reserve funds should only be used when a component or a section of a component is replaced in full, or in part that will not be discarded when additional replacement occurs.  Below are some examples of when to draw from Reserves:`],
        ['do', [
            'Sectional concrete replacement',
            'Large sections of piping replacement',
            'Higher percentages of pointing work',
            'Large sections of painting',
            'Individual floor carpeting'
        ]],
        ['doNot', [
            "Roof patching",
            "Asphalt patching",
            "Minor plumbing repairs",
            "Mechanical equipment repairs"
        ]]
    ]],
    ['exclusions', `Life of Building & Site-Specific Exclusions`, [
        ['info', `There are components on every property that are considered ‘Life of Building’ that are excluded from the reserve funding.  Other components may be excluded as Unit Owner Responsibility.  Unless noted otherwise the below components have been excluded from funding in this reserve study:`],
        ['types', [
            'Building Framing',
            'Interior Doors',
            'Drywall',
            'Interior Trim',
            'Interior Stair Systems'
        ]],
        ['outro', `As well as site specific items not reflected in this report considered by the inspector to be life of building.`]
    ]]
]

