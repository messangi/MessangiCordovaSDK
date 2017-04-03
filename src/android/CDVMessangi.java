package com.ogangi.cordova.plugins;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.res.Resources;
import android.location.Location;

import com.google.android.gms.location.Geofence;
import com.ogangi.messangi.android.sdk.Messangi;
import com.ogangi.messangi.android.sdk.MessangiListener;
import com.ogangi.messangi.android.sdk.Preferences;
import com.ogangi.messangi.android.sdk.Workspace;
import com.ogangi.messangi.android.sdk.vo.BeaconVO;
import com.ogangi.messangi.android.sdk.vo.GeoFenceVO;
import com.ogangi.messangi.android.sdk.vo.MessageVO;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

/**
 * Wrapper from functions implemented in Messangi SDK
 */
public class CDVMessangi extends CordovaPlugin {
    private static final String COARSE_LOCATION = Manifest.permission.ACCESS_COARSE_LOCATION;
    private static final String FINE_LOCATION = Manifest.permission.ACCESS_FINE_LOCATION;
    private static final String READ_PHONE_STATE = Manifest.permission.READ_PHONE_STATE;
    private static final String RECEIVE_SMS = Manifest.permission.RECEIVE_SMS;
    private static final String READ_SMS = Manifest.permission.READ_SMS;
    private static final int LOCATION_REQ_CODE = 0;
    private static final int PHONE_REQ_CODE = 1;
    private static final int SMS_REQ_CODE = 2;


    private Context context;
    private CallbackContext pushCallback;
    private CallbackContext locationCallback;
    private CallbackContext readyCallback;
    private CallbackContext geofenceCallback;



    /**
     * Initialize the plugin
     */
    @Override
    public void pluginInitialize() {
        context = this.cordova.getActivity().getApplicationContext();
        Messangi.getInstance().loadCredentials(context);

        // Subscription manager
        Resources res = context.getResources();
        String url = res.getString(com.ogangi.messangi.android.sdk.R.string.subscription_url);
        String instanceID = res.getString(com.ogangi.messangi.android.sdk.R.string.subscription_id);

        if(!url.equals("null") && !instanceID.equals("null")){
            Messangi.getInstance().loadSubscriptionCredentials(context);
        }
        
        if(!cordova.hasPermission(COARSE_LOCATION) || !cordova.hasPermission(FINE_LOCATION)){
            String [] location_permissions = {
                    COARSE_LOCATION,
                    FINE_LOCATION
            };
            cordova.requestPermissions(this, LOCATION_REQ_CODE, location_permissions);
        }
    }



    @Override
    public void onRequestPermissionResult(int requestCode, String[] permissions, int[] grantResults) throws JSONException{}



    /**
     * Main method invoke, this method call all functions in plugin
     * @param action Function to execute
     * @param args Array of argument sent from JS
     * @param callbackContext function that sent to javascript success with data or error
     * @return boolean true if action is valid, false otherwise
     * @throws JSONException [description]
     */
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if(action.equals("init")){
            this.init(callbackContext);
            return true;
        }else if(action.equals("validUser")) {
            this.validUser(callbackContext);
            return true;
        }else if(action.equals("getPhone")){
            this.getPhone(callbackContext);
            return true;
        }else if(action.equals("register")) {
            String token =null;
            if(args.length() == 1){
                token = args.getString(0);
            }
            if(token == null){
                this.register(callbackContext);
            }else{
                this.registerWithToken(token,callbackContext);
            }
            return true;
        }else if(action.equals("sendPhoneNumber")) {
            String phone = args.getString(0);
            this.registerWithPhone(phone,callbackContext);
            return true;
        }else if(action.equals("sendValidationCode")){
            String code = args.getString(0);
            this.activatePhoneWithCode(code,callbackContext);
            return true;
        }else if(action.equals("getAvailableWorkspaces")){
            this.getAvailableWorkspaces(callbackContext);
            return true;
        }else if(action.equals("getSubscribedWorkspaces")){
            this.getSubscribedWorkspaces(callbackContext);
            return true;
        }else if(action.equals("getDefaultWorkspace")){
            this.getDefaultWorkspace(callbackContext);
            return true;
        }else if(action.equals("getWorkspace")){
            String clientId = args.getString(0);
            this.getWorkspace(clientId,callbackContext);
            return true;
        }else if(action.equals("joinWorkspace")){
            String clientId = args.getString(0);
            this.joinWorkspace(clientId,callbackContext);
            return true;
        }else if(action.equals("leaveWorkspace")){
            String clientId = args.getString(0);
            this.leaveWorkspace(clientId,callbackContext);
            return true;
        }else if(action.equals("sendMessage")){
            String clientId = args.getString(0);
            String message = args.getString(1);
            this.sendMessage(clientId,message,callbackContext);
            return true;
        }else if(action.equals("listMessages")){
            ArrayList<String> clientsIds = new ArrayList<String>(args.length());
            for (int i = 0, l = args.length(); i < l; i++) {
                try {
                    clientsIds.add(args.getString(i));
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
            this.listMessages(clientsIds, callbackContext);
            return true;
        }else if(action.equals("listGeofences")){
            ArrayList<String> clientsIds = new ArrayList<String>(args.length());
            for (int i = 0, l = args.length(); i < l; i++) {
                try {
                    clientsIds.add(args.getString(i));
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
            this.listGeofences(clientsIds, callbackContext);
            return true;
        }else if(action.equals("listBeacons")){
            String type = args.getString(0);
            ArrayList<String> clientsIds = new ArrayList<String>(args.length()-1);
            for (int i = 1, l = args.length(); i < l; i++) {
                try {
                    clientsIds.add(args.getString(i));
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
            this.listBeacons(clientsIds, type, callbackContext);
            return true;
        }else if(action.equals("pushCallback")){
            pushCallback = callbackContext;
            return true;
        }else if(action.equals("locationCallback")){
            locationCallback = callbackContext;
            return true;
        }else if(action.equals("geofenceCallback")){
            geofenceCallback = callbackContext;
            return true;
        }else if(action.equals("getCurrentLocation")){
            this.getCurrentLocation(callbackContext);
            return true;
        }else if(action.equals("setLocationPriority")){
            this.setLocationPriority(args.getInt(0), callbackContext);
            return true;
        }else if(action.equals("setLocationInterval")){
            this.setLocationInterval(args.getLong(0), callbackContext);
            return true;
        }
        /*
        //TODO: Subscription List
        else if (action.equals("subscriptionsList")) {
            this.getSubscriptionList(callbackContext);
            return true;
        }else if(action.equals("subscribeToList")){
            String id = args.getJSONArray(0).getString(0);
            this.subscribeToList(id,callbackContext);
            return true;
        }else if(action.equals("unsubscribeFromList")){
            String id = args.getJSONArray(0).getString(0);
            this.unSubscribeFromList(id,callbackContext);
            return true;
        }
        */
        return false;
    }

    @Override
    public void onDestroy() {
        Messangi.getInstance().unBindService();
        super.onDestroy();
    }

    private void init(final CallbackContext callback){
        readyCallback = callback;
        final Activity activity = this.cordova.getActivity();
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                Messangi.getInstance().addMessangiListener(new MessangiListener() {
                    @Override
                    public void pushReceived(MessageVO messageVO, Workspace workspace) {
                        if(pushCallback == null){
                            return;
                        }
                        PluginResult result = new PluginResult(PluginResult.Status.OK, messageVO.serialize());
                        result.setKeepCallback(true);
                        pushCallback.sendPluginResult(result);
                    }

                    @Override
                    public void updateFencesStatus(Geofence geofence, int geofenceTransition, Location location, Workspace workspace) {
                        if(geofenceCallback == null){
                            return;
                        }
                        String geofenceId = geofence.getRequestId();
                        PluginResult result = new PluginResult(PluginResult.Status.ERROR, "Geofence with id: "+geofenceId+" not found");
                        List<GeoFenceVO> geofences = workspace.getGeofences();
                        for(GeoFenceVO tmp : geofences){
                            if(tmp.getGeoFenceId().equals(geofenceId)){
                                result = new PluginResult(PluginResult.Status.OK, tmp.toJSON());
                                break;
                            }
                        }
                        result.setKeepCallback(true);
                        geofenceCallback.sendPluginResult(result);
                    }

                    @Override
                    public void postInit() {
                        Messangi.getInstance().synchronize();
                        PluginResult result = new PluginResult(PluginResult.Status.OK);
                        result.setKeepCallback(true);
                        readyCallback.sendPluginResult(result);
                    }

                    @Override
                    public void onLocationChange(Location location) {
                        if(locationCallback == null || location == null){
                            return;
                        }
                        PluginResult result;
                        JSONObject locationJson = new JSONObject();
                        try {
                            locationJson.put("latitude",location.getLatitude());
                            locationJson.put("longitude",location.getLongitude());
                            locationJson.put("provider",location.getProvider());
                            locationJson.put("time",location.getTime());
                            if(location.hasAccuracy()){
                                locationJson.put("accuracy",location.getAccuracy());
                            }

                            if(location.hasAltitude()){
                                locationJson.put("altitude",location.getAltitude());
                            }

                            if(location.hasBearing()){
                                locationJson.put("bearing",location.getBearing());
                            }

                            if(location.hasSpeed()){
                                locationJson.put("speed",location.getSpeed());
                            }
                            result = new PluginResult(PluginResult.Status.OK, locationJson);
                        } catch (JSONException e) {
                            e.printStackTrace();
                            result = new PluginResult(PluginResult.Status.ERROR, e.getLocalizedMessage());
                        }
                        result.setKeepCallback(true);
                        locationCallback.sendPluginResult(result);
                    }

                    @Override
                    public void onGeofenceUpdate(String s, String s1, Workspace workspace) {

                    }

                    @Override
                    public void onBeaconUpdate(String s, String s1, Workspace workspace) {

                    }
                });
                Messangi.getInstance().init(activity);
                Messangi.getInstance().bindService();

            }
        });

    }

    private void validUser(CallbackContext callback){
        PluginResult result;
        if(Preferences.getInstance(context).getString(Preferences.PHONE_ACTIVATED).equals("true")){
            result = new PluginResult(PluginResult.Status.OK,true);
        }else{
            result = new PluginResult(PluginResult.Status.OK,false);
        }
        callback.sendPluginResult(result);
    }

    private void getPhone(CallbackContext callback){
        String number = Preferences.getInstance(context).getString(Preferences.PHONE_NUMBER);
        if(!number.equals("")) {
            callback.success(number);
        }else{
            callback.error("Phone not register yet");
        }
    }

    private void register(CallbackContext callback){
        if(!cordova.hasPermission(RECEIVE_SMS) || !cordova.hasPermission(READ_SMS) || !cordova.hasPermission(READ_PHONE_STATE)){
            String [] login_permissions = {
                    READ_PHONE_STATE,
                    RECEIVE_SMS,
                    READ_SMS
            };
            cordova.requestPermissions(this, SMS_REQ_CODE, login_permissions);
        }
        Messangi.getInstance().registerDialog(this.cordova.getActivity().getApplicationContext(),this.cordova.getActivity());
        callback.success();
    }

    private void registerWithToken(String token, CallbackContext callback){
        Messangi.getInstance().register(context, null, token);
        callback.success();
    }

    private void getCurrentLocation(final CallbackContext callback){
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                Location location = Messangi.getInstance().getLastKnownLocation();
                PluginResult result;
                JSONObject locationJson = new JSONObject();
                try {
                    locationJson.put("latitude",location.getLatitude());
                    locationJson.put("longitude",location.getLongitude());
                    locationJson.put("provider",location.getProvider());
                    locationJson.put("time",location.getTime());
                    if(location.hasAccuracy()){
                        locationJson.put("accuracy",location.getAccuracy());
                    }

                    if(location.hasAltitude()){
                        locationJson.put("altitude",location.getAltitude());
                    }

                    if(location.hasBearing()){
                        locationJson.put("bearing",location.getBearing());
                    }

                    if(location.hasSpeed()){
                        locationJson.put("speed",location.getSpeed());
                    }
                    result = new PluginResult(PluginResult.Status.OK, locationJson);
                } catch (JSONException e) {
                    e.printStackTrace();
                    result = new PluginResult(PluginResult.Status.ERROR, e.getLocalizedMessage());
                }
                callback.sendPluginResult(result);
            }
        });

    }

    /************************************************************************************
     *********************************  Custom Register Phone  ***************************
     *************************************************************************************/

    private void registerWithPhone(String phone, CallbackContext callback){
        if(Messangi.getInstance().registerPhone(context, phone)){
            callback.success();
        }else{
            callback.error("Fail registering phone "+ phone);
        }
    }

    /************************************************************************************
     *********************************  Custom Validate Code  ****************************
     *************************************************************************************/

    private void activatePhoneWithCode(String code, CallbackContext callback){
        if(Messangi.getInstance().activatePhone(context, code)){
            callback.success();
        }else{
            callback.error("Error in code "+ code);
        }
    }

    /************************************************************************************
     *********************************  Workspace  ***************************************
     *************************************************************************************/

    private void getAvailableWorkspaces(final CallbackContext callback){
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                List<Workspace> list = Messangi.getInstance().getAvailableWorkspaces();
                JSONArray jArray = new JSONArray();
                for (Workspace wk : list) {
                    JSONObject jsonWorkspace = wk.serialize();
                    if(jsonWorkspace != null){
                        jArray.put(jsonWorkspace);
                    }
                }
                callback.success(jArray);
            }
        });
    }

    private void getSubscribedWorkspaces(final CallbackContext callback){
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                List<Workspace> list = Messangi.getInstance().getSubscribedWorkspaces();
                JSONArray jArray = new JSONArray();
                for (Workspace wk : list) {
                    JSONObject jsonWorkspace = wk.serialize();
                    if(jsonWorkspace != null){
                        jArray.put(jsonWorkspace);
                    }
                }
                callback.success(jArray);
            }
        });
    }

    private void getDefaultWorkspace(final CallbackContext callback){
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                Workspace dWorkspace = Messangi.getInstance().getDefaultWorkspace();
                JSONObject workspaceJson = dWorkspace.serialize();
                if(workspaceJson != null){
                    callback.success(workspaceJson);
                }else{
                    callback.error("Not Default Workspace found");
                }
            }
        });

    }

    private void getWorkspace(final String clientId, final CallbackContext callback){
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                Workspace workspace = Messangi.getInstance().getWorkspace(clientId);
                callback.success(workspace.serialize());
            }
        });

    }

    private void joinWorkspace(final String clientId, final CallbackContext callback){
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                Workspace workspace = Messangi.getInstance().getWorkspace(clientId);
                if(workspace != null && Messangi.getInstance().joinToWorkspace(workspace)){
                    callback.success(Messangi.getInstance().getWorkspace(clientId).serialize());
                }else{
                    callback.error("Error joining to Workspace with client ID "+clientId);
                }
            }
        });

    }

    private void leaveWorkspace(final String clientId, final CallbackContext callback){
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                Workspace workspace = Messangi.getInstance().getWorkspace(clientId);
                if(workspace != null && Messangi.getInstance().leaveFromWorkspace(workspace)){
                    callback.success();
                }else{
                    callback.error("Error leaving Workspace with client ID "+clientId);
                }
            }
        });

    }

    /************************************************************************************
     *********************************  Messages  ****************************************
     *************************************************************************************/

    private void sendMessage(final String clientId, final String message, final CallbackContext callback){
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                Workspace workspace = Messangi.getInstance().getWorkspace(clientId);
                if(workspace != null && workspace.sendMessage(context, message)){
                    callback.success();
                }else{
                    callback.error("Error sending Message to Workspace with client ID "+clientId);
                }
            }
        });
    }

    private void listMessages(final List<String> clientsIds, final CallbackContext callback){
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                JSONArray jArray = new JSONArray();
                for(String clientId : clientsIds){
                    Workspace workspace = Messangi.getInstance().getWorkspace(clientId);
                    if(workspace == null){
                        continue;
                    }
                    for(MessageVO message : workspace.getMessages()){
                        JSONObject jsonMessage = message.serialize();
                        if(jsonMessage != null){
                            jArray.put(jsonMessage);
                        }
                    }
                }
                callback.success(jArray);
            }
        });

    }

    /************************************************************************************
     *********************************  Geofences  ***************************************
     *************************************************************************************/

    private void listGeofences(final List<String> clientsIds, final CallbackContext callback){
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                JSONArray jArray = new JSONArray();
                for(String clientId : clientsIds){
                    Workspace workspace = Messangi.getInstance().getWorkspace(clientId);
                    if(workspace == null){
                        continue;
                    }
                    for(GeoFenceVO geofence : workspace.getGeofences()){
                        JSONObject jsonGeofence = geofence.serialize();
                        if(jsonGeofence != null){
                            jArray.put(jsonGeofence);
                        }
                    }
                }
                callback.success(jArray);
            }
        });

    }

    /************************************************************************************
     *********************************  Beacons  *****************************************
     *************************************************************************************/

    private void listBeacons(final List<String> clientsIds, final String type, final CallbackContext callback){
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                JSONArray jArray = new JSONArray();
                for(String clientId : clientsIds){
                    Workspace workspace = Messangi.getInstance().getWorkspace(clientId);
                    if(workspace == null){
                        continue;
                    }
                    List<BeaconVO> beacons;
                    if(type.equalsIgnoreCase("wifi")){
                        beacons = workspace.getWifiBeacons();
                    }else if(type.equalsIgnoreCase("bluetooth")){
                        beacons = workspace.getBluetoothBeacons();
                    }else{
                        beacons = workspace.getBeacons();
                    }

                    for(BeaconVO beacon : beacons){
                        JSONObject jsonBeacon = beacon.serialize();
                        if(jsonBeacon != null){
                            jArray.put(jsonBeacon);
                        }
                    }
                }
                callback.success(jArray);
            }
        });

    }

    /*************************************************************************************
     *********************************  Location Configuration  **************************
     *************************************************************************************/

    private void setLocationPriority(int priority, CallbackContext callback){
        Messangi.getInstance().setLocationType(priority);
        callback.success();
    }

    private void setLocationInterval(long interval, CallbackContext callback){
        Messangi.getInstance().setLocationUpdateTime(interval);
        callback.success();
    }

    /*************************************************************************************
     *********************************  Subscriptions  ***********************************
     *************************************************************************************/

    //subscribe
    //unsubscribe
    //list

}
