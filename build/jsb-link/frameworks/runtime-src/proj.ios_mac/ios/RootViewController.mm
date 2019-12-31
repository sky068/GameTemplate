/****************************************************************************
 Copyright (c) 2013      cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
****************************************************************************/

#import "RootViewController.h"
#import "cocos2d.h"

#include "platform/CCApplication.h"
#include "platform/ios/CCEAGLView-ios.h"

static UIImageView * splashView = nil;

@implementation RootViewController

+ (void) removeSplashView {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (splashView != nil) {
            [splashView removeFromSuperview];
            splashView = nil;
            NSLog(@"iOS: 移除splash view");
        }
    });
}

// 添加splash，防止启动时长时间黑屏
- (void) addSplashView {
    if (splashView == nil) {
        NSLog(@"iOS 添加splash view");
        UIImage *img = [UIImage imageNamed:@"LaunchScreenBackground.png"];
        splashView = [[UIImageView alloc]initWithImage:img];
        splashView.frame =CGRectMake(0,([UIScreen mainScreen].bounds.size.height-img.size.height*[UIScreen mainScreen].bounds.size.width/img.size.width)/2, [UIScreen mainScreen].bounds.size.width, img.size.height*[UIScreen mainScreen].bounds.size.width/img.size.width);
        [self.view addSubview:splashView];
    }
}

/*
// The designated initializer.  Override if you create the controller programmatically and want to perform customization that is not appropriate for viewDidLoad.
- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil {
if ((self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil])) {
// Custom initialization
}
return self;
}
*/

// Implement loadView to create a view hierarchy programmatically, without using a nib.
- (void)loadView {
    // Set EAGLView as view of RootViewController
    self.view = (__bridge CCEAGLView *)cocos2d::Application::getInstance()->getView();
}

// Implement viewDidLoad to do additional setup after loading the view, typically from a nib.
- (void)viewDidLoad {
    [super viewDidLoad];
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
}

- (void)viewDidDisappear:(BOOL)animated {
    [super viewDidDisappear:animated];
}


// For ios6, use supportedInterfaceOrientations & shouldAutorotate instead
#ifdef __IPHONE_6_0
- (NSUInteger) supportedInterfaceOrientations{
    return UIInterfaceOrientationMaskAllButUpsideDown;
}
#endif

- (BOOL) shouldAutorotate {
    return YES;
}

- (void)didRotateFromInterfaceOrientation:(UIInterfaceOrientation)fromInterfaceOrientation {
    [super didRotateFromInterfaceOrientation:fromInterfaceOrientation];
}

//fix not hide status on ios7
- (BOOL)prefersStatusBarHidden {
    return YES;
}

// Controls the application's preferred home indicator auto-hiding when this view controller is shown.
- (BOOL)prefersHomeIndicatorAutoHidden {
    return YES;
}

- (void)didReceiveMemoryWarning {
    // Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];

    // Release any cached data, images, etc that aren't in use.
}


@end
