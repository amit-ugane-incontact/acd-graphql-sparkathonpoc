import { buildSchema } from 'graphql';

const skillsSchema = buildSchema(`
    type Skill {
        skillId: Int
        skillName: String
        mediaTypeId: Int
        mediaTypeName: String
        workItemQueueType: String 
        isActive: Boolean
        campaignId: Int
        campaignName: String
        notes: String
        acwTypeId: Int
        stateIdACW: Int
        stateNameACW: String
        maxSecondsACW: Int
        acwPostTimeoutStateId: Int
        acwPostTimeoutStateName: String
        requireDisposition: String
        allowSecondaryDisposition: String
        agentRestTime: Int
        makeTranscriptAvailable: String
        transcriptFromAddress: String
        displayThankyou: String
        thankYouLink: String
        popThankYou: String
        popThankYouURL: String
        isOutbound: String
        outboundStrategy: String
        isRunning: String
        priorityBlending: String
        callerIdOverride: String
        scriptId: Int
        scriptName: String
        emailFromAddress: String
        emailFromEditable: String
        emailBccAddress: String 
        emailParking: String
        chatWarningThreshold: Int
        agentTypingIndicator: String
        patronTypingPreview: String
        interruptible: String
        callSuppressionScriptId: Int
        reskillHours: Int
        reskillHoursName: String
        countReskillHours: String
        minWFIAgents: Int
        minWFIAvailableAgents: Int
        useScreenPops: String
        screenPopTriggerEvent: String
        useCustomScreenPops: String
        screenPopDetail: String
        minWorkingTime: Int
        agentless: String
        agentlessPorts: Int
        initialPriority: Int
        acceleration: Int 
        maxPriority: Int
        serviceLevelThreshold: Int
        serviceLevelGoal: Int
        enableShortAbandon: String
        shortAbandonThreshold: Int
        countShortAbandons: String
        countOtherAbandons: String
        messageTemplateId: Int
        smsTransportCodeId: Int
        smsTransportCode: String
        deliverMultipleNumbersSerially: String
        cradleToGrave: String
        priorityInterrupt: String
        outboundTelecomRouteId: Int
    }

    type SkillsResponseData
    {
        businessUnitId :String
        lastPollTime : String
        totalRecords : Int
        skills : [Skill]
    }

    input GetSkillsQueryInput {
        updatedSince: String
        mediaTypeId :Int
        outboundStrategy: String
        isActive: Boolean
        searchString: String
        fields: String
        skip: Int
        top: Int
        orderby: String
    }    

    type Query {
        getSkills (input : GetSkillsQueryInput) : SkillsResponseData               
    }    
`);

export default skillsSchema;
