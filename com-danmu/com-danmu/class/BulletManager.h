//
//  BulletManager.h
//  com-danmu
//
//  Created by wgz on 2016/12/8.
//  Copyright © 2016年 fiskz. All rights reserved.
//

#import <Foundation/Foundation.h>
@class BulletView;

@interface BulletManager : NSObject

@property (nonatomic,copy) void (^generateViewBlock)(BulletView *view);

//弹幕开始执行
-(void) start;

//弹幕停止执行
-(void) stop;
@end
