//
//  ViewController.m
//  com-danmu
//
//  Created by wgz on 2016/12/8.
//  Copyright © 2016年 fiskz. All rights reserved.
//

#import "ViewController.h"
#import "BulletManager.h"
#import "BulletView.h"

@interface ViewController ()

@property (nonatomic,strong) BulletManager *manager;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    self.manager = [[BulletManager alloc] init];
    __weak typeof(self) myself = self;
    self.manager.generateViewBlock = ^(BulletView *view)
    {
        [myself addBullectView:view];
    };
    
    UIButton * btn = [UIButton buttonWithType:UIButtonTypeCustom];
    [btn setTitle:@"start" forState:UIControlStateNormal];
    [btn setTitleColor:[UIColor blueColor] forState:UIControlStateNormal];
    btn.frame = CGRectMake(100, 100, 100, 40);
    [btn addTarget:self action:@selector(clickBtn) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:btn];
    
    btn = [UIButton buttonWithType:UIButtonTypeCustom];
    [btn setTitle:@"stop" forState:UIControlStateNormal];
    [btn setTitleColor:[UIColor blueColor] forState:UIControlStateNormal];
    btn.frame = CGRectMake(210, 100, 100, 40);
    [btn addTarget:self action:@selector(clickStopBtn) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:btn];
}

-(void) clickBtn
{
    [self.manager start];
}

-(void)clickStopBtn
{
    [self.manager stop];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(void) addBullectView:(BulletView *) view
{
    CGFloat width = [UIScreen mainScreen].bounds.size.width;
    view.frame = CGRectMake(width, 300+view.trajectory*40, CGRectGetWidth(view.bounds), CGRectGetHeight(view.bounds));
    [self.view addSubview:view];
    
    [view startAnimation];
}

@end
