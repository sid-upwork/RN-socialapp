package com.twocents;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import io.underscope.react.fbak.RNAccountKitPackage;
import com.surajit.rnrg.RNRadialGradientPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.brentvatne.react.ReactVideoPackage;

import com.devfd.RNGeocoder.RNGeocoderPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.imagepicker.ImagePickerPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import dk.madslee.imageCapInsets.RCTImageCapInsetPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import org.reactnative.camera.RNCameraPackage;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.pusherman.networkinfo.RNNetworkInfoPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(), new VectorIconsPackage(), new RNAccountKitPackage(),
          new RNNetworkInfoPackage(), new RNRadialGradientPackage(), new RNGestureHandlerPackage(), new PickerPackage(),
          new ReactVideoPackage(), new SplashScreenReactPackage(), new SnackbarPackage(), new ImagePickerPackage(),
          new RCTImageCapInsetPackage(), new RNCameraPackage(), new FastImageViewPackage(), new RNGeocoderPackage(),
          new RNFirebasePackage(), new RNFirebaseDatabasePackage(), new RNFirebaseNotificationsPackage(),
          new RNFirebaseMessagingPackage());
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }

}
