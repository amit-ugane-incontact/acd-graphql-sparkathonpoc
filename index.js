const { GraphQLServer } = require("graphql-yoga");
const fetch = require("node-fetch");
const querystring = require('querystring');
const baseURL = "https://api-na1.staging.niceincontact.com/incontactapi/"
const accesstoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ1c2VyOjExZTliMzRiLTgwOWUtN2MyMC1hZjU5LTAyNDJhYzExMDAwMiIsInJvbGUiOnsibGVnYWN5SWQiOiJBZG1pbmlzdHJhdG9yIiwic2Vjb25kYXJ5Um9sZXMiOltdLCJpZCI6IjExZTdkYWMwLWMyNmQtNTJkMC1hZjE3LTAyNDJhYzExMDAwNCIsImxhc3RVcGRhdGVUaW1lIjoxNjI1NjY5OTMyMDAwfSwiaWNBZ2VudElkIjoiMzkyMjIxIiwiaXNzIjoiaHR0cHM6XC9cL2F1dGguc3RhZ2luZy5uaWNlLWluY29udGFjdC5jb20iLCJnaXZlbl9uYW1lIjoiTWFuZ2VzaCIsImF1ZCI6ImludGVybmFsQGluY29udGFjdCBpbmMuIiwiaWNTUElkIjoiMTA3Mzc0MTg4NSIsImljQlVJZCI6NDU5OTAwNiwibmFtZSI6Im1hbmdlc2guZ2hvcm1vZGVAbmljZS5jb20iLCJ0ZW5hbnRJZCI6IjExZTdkYWMwLWJlMDEtYmI1MC1iMjAyLTAyNDJhYzExMDAwMyIsImV4cCI6MTYyNTczODU5OSwiaWF0IjoxNjI1NzM0OTk5LCJmYW1pbHlfbmFtZSI6Ikdob3Jtb2RlIiwidGVuYW50IjoicGVybV9TTzMyTG9hZF8xMDAwMDUiLCJ2aWV3cyI6e30sImljQ2x1c3RlcklkIjoiU08zMiJ9.V1VHkTPYLCwufPlUJ6SQKPrsuhfFsnDoUuoXyXepcDgOPO2OBbs9w0IQAWc37eGGla3i1MiFZZkU4E4B9l_zre_mlxLhdb_Dh03lUeK9L3vHEy2gUiIASZP_lgd-9MAqAIujkITo4xPdzzJjSHB6s6VqV-iUAgl2-LUZNSpXANs"

const typeDefs = `
  type Query {
    getAgents (input : GetAgentQueryInput) : [Agent]
    getSkill(skillId : Int!) : Skill
  }

  input GetAgentQueryInput {
    updatedSince: String
    isActive: Boolean
    isLocked: Boolean
    searchString: String
    skip: Int
    top: Int
    orderby: String
}

type agentSettings
  {
        wfoWebsiteUrl : String
        wfoWebServiceUrl : String
        wfoApiUrl : String
    }
type Agent {
    agentId: Int
    userName: String
    firstName: String
    middleName: String
    lastName: String
    userId: String
    emailAddress: String
    teamName: String
    profileId: Int
    profileName: String
    settings : agentSettings
  }

  type GeneralSettings {
    minimumRetryMinutes: Int
    maximumAttempts: Int
    defaultContactExpiration: Int
    getPriorityContactsOnContactInsertion: Boolean,
    loadCallbacks: Boolean,
    loadFresh: Boolean,
    loadNonFresh: Boolean,
    overrideBusinessUnitAbandonRate: Boolean,
    maximumRingingDuration: Int
    beginDampenPercentage: Int
    abandonRateCutoff: Float
    abandonRateThreshold: Int
    inactiveBlenderTimer: Int
    maximumRatio: Int
    aggressiveness: String
    endOfListNotificationsDelay: Int
    notifyAgentsWhenListIsEmpty: Boolean
    percentageOfAgentsBeforeOverdial: Int
    blockMultipleCalls: Boolean
    consecutiveAttemptsWithoutALiveConnect: Int
    enableDialingByProficiency: Boolean
    proficiencyFactor: Float
    waitTimeFactor: Float
    maxConcurrentCallsPerAgent: Int
    maxWaitTimeSeconds: Int
}  

type SkillRetrySettings {
    loadNonFresh : Boolean
    finalizeWhenExhausted : Boolean
    maximumAttempts : Int
    minimumRetryMinutes : Int
    maximumNumberOfHandledCalls : Int
    restrictedCallingMinutes : Int
    restrictedCallingMaxAttempts : Int
    generalStaleMinutes : Int
    callbackRestMinutes : Int
    releaseAgentSpecificCalls : Boolean
    maximumNumberOfCallbacks : Int
    callbackStaleMinutes : Int
}

type XsSettings {
    xsScriptID : Int
    xsCheckinScriptID : Int
    externalOutboundSkill_No : String
    xsSkillChangedActive : Boolean
    xsGetContactsActive : Boolean
    xsFreshThreshold : Int
    xsAvailableThreshold : Int
    xsReadyThreshold : Int
    xsNumberToRetrieve : Int
}

type DeliveryPreferences {
    confirmationRequiredDisabled: Boolean
    confirmationRequiredDeliveryType: Int
    confirmationRequiredTimeout: Int
    confirmationRequiredTimeoutSubsequent: Int
    confirmationRequiredDefaultAccept: Boolean
    confirmationRequiredDefault: Boolean
    complianceRecordsDisabled: Boolean
    complianceRecordsDeliveryType: Int
    complianceRecordsTimeout: Int
    complianceRecordsTimeoutSubsequent: Int
    complianceRecordsDefaultAccept: Boolean
    showComplianceButtonReschedule: Boolean
    showComplianceButtonRequeue: Boolean
    showComplianceButtonSnooze: Boolean
    showComplianceButtonDisposition: Boolean
    showPreviewButtonReschedule: Boolean
    showPreviewButtonRequeue: Boolean
    showPreviewButtonSnooze: Boolean
    showPreviewButtonDisposition: Boolean
}

type ScheduleSettings {
    isScheduled: Boolean
    sundayStartTime : String
    sundayEndTime : String
    sundayIsActive: Boolean
    mondayStartTime : String
    mondayEndTime : String
    mondayIsActive : Boolean
    tuesdayStartTime : String
    tuesdayEndTime : String
    tuesdayIsActive : Boolean
    wednesdayStartTime : String
    wednesdayEndTime : String
    wednesdayIsActive : Boolean
    thursdayStartTime : String
    thursdayEndTime : String
    thursdayIsActive : Boolean
    fridayStartTime : String
    fridayEndTime : String
    fridayIsActive : Boolean
    saturdayStartTime : String
    saturdayEndTime : String
    saturdayIsActive: Boolean
}

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
  generalSettings : GeneralSettings,
  scheduleSettings: ScheduleSettings,
  skillRetrySettings : SkillRetrySettings,
  xsSettings : XsSettings,
  deliveryPreferences: DeliveryPreferences
}

`;

const resolvers = {
  
  Agent: {    
    settings: parent => {
      const agentSettingsUrl = `${baseURL}/services/v20.0/agents/${parent.agentId}/agent-settings`;
      console.log(agentSettingsUrl);
      return fetch(agentSettingsUrl,
        {            
            headers : 
            {
                "authorization": "Bearer "+ accesstoken
            }            
        })
        .then(response => response.json())                
    }
  },
  Skill:{
    generalSettings: parent => {      
      const generalSettingsUrl = `${baseURL}/services/v13.0/skills/${parent.skillId}/parameters/general-settings`;
      console.log(generalSettingsUrl);
      return fetch(generalSettingsUrl,
        {            
            headers : 
            {
                "authorization": "Bearer "+ accesstoken
            }            
        })
        .then(response => response.json())
    },
    scheduleSettings : parent => {      
      const scheduleSettingsUrl = `${baseURL}/services/v13.0/skills/${parent.skillId}/parameters/schedule-settings`;
      console.log(scheduleSettingsUrl);
      return fetch(scheduleSettingsUrl,
        {            
            headers : 
            {
                "authorization": "Bearer "+ accesstoken
            }            
        })
        .then(response => response.json())
    },
    skillRetrySettings : parent => {      
      const skillRetrySettingsUrl = `${baseURL}/services/v13.0/skills/${parent.skillId}/parameters/retry-settings`;
      console.log(skillRetrySettingsUrl);
      return fetch(skillRetrySettingsUrl,
        {            
            headers : 
            {
                "authorization": "Bearer "+ accesstoken
            }            
        })
        .then(response => response.json())
    },
    xsSettings : parent => {      
      const xsSettingsUrl = `${baseURL}/services/v13.0/skills/${parent.skillId}/parameters/xs-settings`;
      console.log(xsSettingsUrl);
      return fetch(xsSettingsUrl,
        {            
            headers : 
            {
                "authorization": "Bearer "+ accesstoken
            }            
        })
        .then(response => response.json())
    },
    deliveryPreferences : parent => {      
      const deliveryPreferencesUrl = `${baseURL}/services/v13.0/skills/${parent.skillId}/parameters/delivery-preferences`;
      console.log(deliveryPreferencesUrl);
      return fetch(deliveryPreferencesUrl,
        {            
            headers : 
            {
                "authorization": "Bearer "+ accesstoken
            }            
        })
        .then(response => response.json())
    }
  },
  Query: {    
    getAgents: async (_, { input }) => {
      var inputData = querystring.stringify(input);
      var requestedUri = `${baseURL}/services/v21.0/agents?${inputData}`;
      console.log(requestedUri);
      const response = await fetch(requestedUri,
        {            
            headers : 
            {
                "authorization": "Bearer "+ accesstoken
            }            
        });
      return response.json().then(data=> data["agents"]);
    },
    getSkill: async (_, {skillId}) =>  {
      var requestedUri = `${baseURL}/services/v19.0/skills/${skillId}`;
      console.log(requestedUri);
 
      const response = await fetch(requestedUri,
       {            
           headers : 
           {
               "authorization": "Bearer "+ accesstoken
           }            
       });
     return response.json();
   }
  }  
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Running a ACD GraphQL API server at http://localhost:4000"));
