//
//  BulletView.h
//  com-danmu
//
//  Created by wgz on 2016/12/8.
//  Copyright © 2016年 fiskz. All rights reserved.
//

#import <UIKit/UIKit.h>
typedef NS_ENUM(NSInteger,MoveStatus)
{
    Start,
    Enter,
    End
};
@interface BulletView : UIView

@property (nonatomic ,assign) int trajectory;//弹道
@property (nonatomic,copy) void (^moveStatusBlock)();//弹幕状态回调

//初始化弹幕
-(instancetype)initWithComment:(NSString *) comment;

//开始动画
-(void) startAnimation;
//结束动画
-(void) stopAnimation;
@end
