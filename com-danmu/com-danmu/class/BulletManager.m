//
//  BulletManager.m
//  com-danmu
//
//  Created by wgz on 2016/12/8.
//  Copyright © 2016年 fiskz. All rights reserved.
//

#import "BulletManager.h"
#import "BulletView.h"

@interface BulletManager()

//弹幕数据来源
@property (nonatomic ,strong) NSMutableArray *datasourrce;
//弹幕使用中的数组变量
@property (nonatomic,strong) NSMutableArray * bulletComments;
//储存弹幕View的数组变量
@property (nonatomic,strong) NSMutableArray * bulletViews;

@property BOOL bStopAnimation;

@end

@implementation BulletManager

-(instancetype) init
{
    if(self = [super init])
    {
        _bStopAnimation = YES;
    }
    return self;
}

-(void) start
{
    if(!_bStopAnimation)
    {
        return;
    }
    _bStopAnimation = NO;
    [self.bulletComments removeAllObjects];
    [self.bulletComments addObjectsFromArray:self.datasourrce];
    
    [self initBulletComment];
}

-(void) stop
{
    if(_bStopAnimation)
    {
        return;
    }
    self.bStopAnimation = YES;
    [self.bulletViews enumerateObjectsUsingBlock:^(id _Nonnull obj,NSUInteger idx,BOOL * _Nonnull stop)
    {
        BulletView * view = obj;
        [view stopAnimation];
        view = nil;
        
    }];
    [self.bulletViews removeAllObjects];
}

//初始化弹幕，随机分配弹幕轨迹
-(void) initBulletComment
{
    //弹道数组
    NSMutableArray *trajectorys = [NSMutableArray arrayWithArray:@[@(0),@(1),@(2)]];
    for (int i = 0; i<3; i++) {
        
        if(self.bulletComments.count >0)
        {
            //通过随机数获取到弹幕的轨迹
            NSInteger index =arc4random()%trajectorys.count;
            int trajectory = [[trajectorys objectAtIndex:index] intValue];
            [trajectorys removeObjectAtIndex:index];
            //从弹幕数组中逐一去除弹幕数组
            NSString * comment = [self.bulletComments firstObject];
            [self.bulletComments removeObjectAtIndex:0];
            //创建弹幕view
            [self createBullectView:comment trajectory:trajectory];
        }
    }
    
}

-(void) createBullectView:(NSString *)comment trajectory:(int)trajectory
{
    if(self.bStopAnimation)
    {
        return;
    }
    BulletView *view = [[BulletView alloc] initWithComment:comment];
    view.trajectory = trajectory;
    [self.bulletViews addObject:view];
    
    __weak typeof (view) weakView = view;
    __weak typeof (self) myself = self;
    view.moveStatusBlock = ^(MoveStatus status){
        if(self.bStopAnimation)
        {
            return;
        }
        switch (status) {
            case Start:
            {
                //弹幕开始进入屏幕，将view加入弹幕管理的变量中BullectViews;
                [myself.bulletViews addObject:weakView];
            }
                break;
            case Enter:
            {
                //弹幕完全进入屏幕，判断是否还有其他内容，如果有则在该弹幕轨迹中创建一个
                NSString * comment = [myself nextComment];
                if(comment)
                {
                    //递归调用创建方法
                    [myself createBullectView:comment trajectory:trajectory];
                }
            }
                break;
            case End:
            {
                //弹幕废除屏幕后从bullectViews中删除，释放资源
                if([myself.bulletViews containsObject:weakView])
                {
                    [weakView stopAnimation];
                    [myself.bulletViews removeObject:weakView];
                }
                if(myself.bulletViews.count == 0)
                {
                    self.bStopAnimation = YES;
                    //说明屏幕上没有没有弹幕了，开训循环滚动
                    [self start];
                }
            }
                break;
            default:
                break;
        }
    };
    if(self.generateViewBlock)
    {
        self.generateViewBlock(view);
    }
}

-(NSString *) nextComment
{
    if(self.bulletComments.count == 0)
    {
        return nil;
    }
    NSString * comment = [self.bulletComments firstObject];
    if(comment)
    {
        [self.bulletComments removeObjectAtIndex:0];
    }
    return comment;
}

-(NSMutableArray*) datasourrce
{
    if(!_datasourrce)
    {
        _datasourrce = [NSMutableArray arrayWithArray:@[@"弹幕1~~~~~~~~~~~",
                                                        @"弹幕2~~~",
                                                        @"弹幕3~~~~~~~~~~~~~~~~~~~~~~~~",
                                                        @"弹幕4~~~~~~~~~~~",
                                                        @"弹幕5~~~",
                                                        @"弹幕6~~~~~~~~~~~~~~~~~~~~~~~~",
                                                        @"弹幕7~~~~~~~~~~~",
                                                        @"弹幕8~~~",
                                                        @"弹幕9~~~~~~~~~~~~~~~~~~~~~~~~",]];
    }
    return _datasourrce;
}

-(NSMutableArray*) bulletComments
{
    if(!_bulletComments)
    {
        _bulletComments = [NSMutableArray array];
    }
    return _bulletComments;
}

-(NSMutableArray*) bulletViews
{
    if(!_bulletViews)
    {
        _bulletViews = [NSMutableArray array];
    }
    return _bulletViews;
}

@end
