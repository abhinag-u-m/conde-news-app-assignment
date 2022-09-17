import React from "react";
import Skeleton from '@mui/material/Skeleton';
import './style.css';

function SkeletonComponent() {
let repeatedDom = [1,2,3,4];
  return (
    <React.Fragment>
        {repeatedDom.map((item, index) => { 
            return (
                <div id={'skeleton'} key={index}>
                    <div className="skeletonEleLeft">
                        <Skeleton variant="rectangular" width={330} height={250}/>
                        <Skeleton />
                        <Skeleton width="80%" />
                        <Skeleton width="60%" />
                        <Skeleton width="40%" />
                    </div>
                    <div className="skeletonEleCenter">
                        <Skeleton variant="rectangular" width={330} height={250}/>
                        <Skeleton />
                        <Skeleton width="80%" />
                        <Skeleton width="60%" />
                        <Skeleton width="40%" />
                    </div>
                    <div className="skeletonEleCenter">
                        <Skeleton variant="rectangular" width={330} height={250}/>
                        <Skeleton />
                        <Skeleton width="80%" />
                        <Skeleton width="60%" />
                        <Skeleton width="40%" />
                    </div>
                    <div className="skeletonEleRight">
                        <Skeleton variant="rectangular" width={330} height={250}/>
                        <Skeleton />
                        <Skeleton width="80%" />
                        <Skeleton width="60%" />
                        <Skeleton width="40%" />
                    </div>
                </div>
            )
        } )}
        
        
    </React.Fragment>
  );
}

export default SkeletonComponent;
