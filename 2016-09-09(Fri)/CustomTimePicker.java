package com.example.ablue.view;

import java.lang.reflect.Field;

import android.content.Context;
import android.graphics.Rect;
import android.graphics.drawable.ColorDrawable;
import android.util.AttributeSet;
import android.util.Log;
import android.widget.NumberPicker;
import android.widget.TextView;
import android.widget.TimePicker;

import com.example.ablue.R;
/*
* 自定义TimePicker，可以改变系统TimePicker的分隔线颜色、粗细以及冒号的显示和颜色。
*/
public class CustomTimePicker extends TimePicker
{
    public CustomTimePicker(Context context)
    {
        super(context);
        init();
    }

    public CustomTimePicker(Context context, AttributeSet attrs)
    {
        super(context, attrs);
        init();
    }

    public CustomTimePicker(Context context, AttributeSet attrs, int defStyleAttr)
    {
        super(context, attrs, defStyleAttr);
        init();
    }


    public void init()
    {
        getNumberPicker(this);
    }


    public void getNumberPicker(TimePicker timePicker)
    {
        try
        {
            Class<?> clazz = Class.forName("com.android.internal.R$id");
            Field fieldHour = clazz.getField("hour");//用反射获取TimePicker的小时 对象
            fieldHour.setAccessible(true);
            int hourId = fieldHour.getInt(null);
            NumberPicker hourNumberPicker = (NumberPicker) timePicker.findViewById(hourId);
            setDividerColor(hourNumberPicker);

            Field fieldminute = clazz.getField("minute");//用反射获取TimePicker的分钟 对象
            fieldminute.setAccessible(true);
            int minuteId = fieldminute.getInt(null);
            NumberPicker minuteNumberPicker = (NumberPicker) timePicker.findViewById(minuteId);
            setDividerColor(minuteNumberPicker);

            //更改冒号颜色
            /*Field fieldDivider=clazz.getField("divider");
            fieldDivider.setAccessible(true);
            int dividerId=fieldDivider.getInt(null);
            
            TextView textView=(TextView)timePicker.findViewById(dividerId);
            textView.setTextColor(getResources().getColor(R.color.first_text_color));*/

        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
    }


    public void setDividerColor(NumberPicker picker)
    {
        Field[] pickerFields = NumberPicker.class.getDeclaredFields();
        for (java.lang.reflect.Field pf : pickerFields)
        {
            Log.i("setDividerColor", "pf:" + pf.getName() + " type :" + pf.getGenericType());
            if (pf.getName().equals("mSelectionDivider"))//能找到这个域 （分割线视图)
            {
                Log.v("setDividerColor", "find......mSelectionDivider");
                pf.setAccessible(true);
                try
                {
                    ColorDrawable colorDrawable = new ColorDrawable();
                    colorDrawable.setColor(getResources().getColor(R.color.ksw_md_ripple_checked));
                    colorDrawable.setAlpha(0);
                    pf.set(picker, colorDrawable);
                }
                catch (Exception e)
                {
                    e.printStackTrace();
                }
                break;
            }
            if (pf.getName().equals("mSelectionDividerHeight"))//找不到这个私有域，（分割线的厚度）
            {
                Log.v("PowerSet", "find......mSelectionDividerHeight.");
            }
        }
    }
}